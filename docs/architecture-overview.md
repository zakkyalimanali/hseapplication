# Architecture Overview

The HSE application is a multi-tenant web platform split into three Docker services that work together: a PostgreSQL database, a Django REST API backend, and an Nginx + React frontend.

---

## High-Level Diagram

```
Browser
  │
  ▼
Nginx (port 8080)
  ├── /                    → React SPA (index.html)
  ├── /api/                → proxy → Django (port 8000)
  ├── /admin/              → proxy → Django (port 8000)
  ├── /hseapp/             → proxy → Django (port 8000)
  ├── /media/              → proxy → Django (port 8000)
  ├── /static/admin/       → proxy → Django (port 8000)
  └── /static/rest_framework/ → proxy → Django (port 8000)
                                  │
                                  ▼
                           Django / Gunicorn (3 workers)
                                  │
                         TenantMainMiddleware
                         (sets schema from Host header)
                                  │
                                  ▼
                           PostgreSQL (port 5432)
                           ├── public schema     ← tenants, domains
                           ├── alicompany schema  ← Ali Company's HSE data
                           └── betacorp schema    ← Beta Corp's HSE data
```

---

## Services

### PostgreSQL (db)

- Image: `postgres:15-alpine`
- Internal port: `5432` (not exposed to host)
- Volume: `postgres_data` — persists database across container restarts
- Health check: `pg_isready` every 10 seconds (5 retries before marked unhealthy)
- All other services wait for this health check before starting

### Django / Gunicorn (backend)

- Built from `backend/Dockerfile` (Python 3.12 slim base)
- Internal port: `8000` (not exposed to host — only Nginx can reach it)
- Volume: `media_files` — persists user-uploaded files (incident photos, documents)
- Starts via `entrypoint.sh` which handles migrations, tenant bootstrapping, and gunicorn
- Runs 3 Gunicorn workers for concurrent request handling
- Depends on: `db` (waits for healthy)

### Nginx + React (frontend)

- Multi-stage Docker build: Node 18 builds the React bundle, Nginx serves it
- Published port: `8080 → 80` (host port 8080 maps to Nginx port 80)
- Serves the built React app as static files
- Proxies all API, admin, and media requests to the backend
- Depends on: `backend`

---

## Nginx Routing

All browser traffic enters through Nginx. Routing decisions:

| Path prefix | What Nginx does |
|---|---|
| `/api/` | Proxy to `http://backend:8000` |
| `/admin/` | Proxy to `http://backend:8000` |
| `/hseapp/` | Proxy to `http://backend:8000` |
| `/media/` | Proxy to `http://backend:8000` |
| `/static/admin/` | Proxy to `http://backend:8000` |
| `/static/rest_framework/` | Proxy to `http://backend:8000` |
| Everything else | Serve `index.html` (React SPA fallback) |

The SPA fallback (`try_files $uri $uri/ /index.html`) is what makes React Router work — any URL that isn't a real file gets the React app, which then handles the route client-side.

All proxy blocks forward the real client IP (`X-Real-IP`) and original `Host` header to Django, which the tenant middleware needs to determine which tenant schema to use.

---

## Django Middleware Stack

Middleware runs in order on every request. The order matters:

| Position | Middleware | Purpose |
|---|---|---|
| 1 | `TenantMainMiddleware` | **Must be first.** Reads `Host` header, looks up matching `Domain` record, sets `connection.schema_name` |
| 2 | `SecurityMiddleware` | HTTPS redirects, security headers |
| 3 | `WhiteNoiseMiddleware` | Serves Django static files (admin, DRF) without a separate web server |
| 4 | `SessionMiddleware` | Session cookie handling |
| 5 | `CorsMiddleware` | Cross-origin request headers |
| 6 | `CommonMiddleware` | URL normalisation |
| 7 | `CsrfViewMiddleware` | CSRF token validation |
| 8 | `AuthenticationMiddleware` | Attaches `request.user` from session/token |
| 9 | `MessageMiddleware` | Flash messages |
| 10 | `XFrameOptionsMiddleware` | Clickjacking protection |
| 11 | `CSPMiddleware` | Content Security Policy headers |

---

## Multi-Tenancy

### Schema-per-tenant

Each company gets its own isolated PostgreSQL schema. Tables in one schema are invisible to queries in another — there is no `WHERE tenant_id = ...` in application code. The schema switch happens at the database connection level.

### Shared vs tenant data

**Public schema** (one copy, shared):
- `tenants_client` — the list of all companies
- `tenants_domain` — domain-to-company mapping
- `auth_user` — Django user accounts (all tenants' users live here)
- Django admin, sessions

**Tenant schemas** (one copy per company):
- All `hseapp_*` tables — Staff, Incidents, Training, etc.
- JWT token blacklist

### URL routing by schema

Django uses two separate URL configurations:

| When | URL config | Typical endpoints |
|---|---|---|
| Request from root domain (`localhost`) | `urls_public.py` | `/api/tenants/create/`, `/api/token/` |
| Request from tenant subdomain (`alicompany.localhost`) | `urls.py` | `/api/incident/`, `/api/staff/`, `/admin/` |

This is controlled by:
```python
ROOT_URLCONF = 'hseproject.urls'
PUBLIC_SCHEMA_URLCONF = 'hseproject.urls_public'
```

---

## Authentication

JWT tokens (HS256) with custom claims:

| Claim | Value |
|---|---|
| `user_id` | Django user ID |
| `username` | Username |
| `tenant_schema` | Schema name of the tenant at login time |
| `staff_id` | Linked Staff profile ID |
| `role` | `staff`, `supervisor`, `hse_officer`, or `company_admin` |

Token lifetimes:
- Access token: **15 minutes**
- Refresh token: **90 days** (with rotation and blacklist on use)

The frontend stores tokens and attaches them as `Authorization: Bearer <token>` on every API request. The backend validates the token and enforces role-based permissions independently on each request.

---

## Request Lifecycle (Full Example)

A supervisor logging an incident at `alicompany.localhost:8080/api/incident/`:

1. Browser sends `POST http://alicompany.localhost:8080/api/incident/` with JWT header
2. Nginx receives request on port 80, matches `/api/` → proxies to `http://backend:8000/api/incident/` with `Host: alicompany.localhost` forwarded
3. Django's `TenantMainMiddleware` reads `Host: alicompany.localhost`, queries `Domain` table in public schema, finds the `alicompany` Client, sets `connection.schema_name = 'alicompany'`
4. `AuthenticationMiddleware` decodes the JWT, sets `request.user`
5. Django routes to `IncidentViewSet` via the router
6. `ReadOnlyOrSupervisor` permission class checks: POST is a write — user's role is `supervisor` (≥ supervisor) → allowed
7. Serializer validates the request body
8. `Incident.objects.create(...)` executes against the `alicompany` schema
9. Django returns `201 Created` with the new record as JSON
10. Nginx proxies the response back to the browser

---

## Static and Media Files

| File type | Who serves it | Path |
|---|---|---|
| React app (JS, CSS, HTML) | Nginx directly | Built into Docker image |
| Django admin / DRF static | WhiteNoise (via Nginx proxy) | `/static/admin/`, `/static/rest_framework/` |
| User uploads (photos, docs) | Django (via Nginx proxy) | `/media/` → `media_files` volume |

---

## Technology Summary

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | React | 18 |
| UI components | Bootstrap 5, RSuite | — |
| Charts | Chart.js | — |
| HTTP client | Axios | — |
| Backend framework | Django + Django REST Framework | 6 |
| Multi-tenancy | django-tenants | — |
| Authentication | SimpleJWT | — |
| WSGI server | Gunicorn | 3 workers |
| Web server / proxy | Nginx | alpine |
| Database | PostgreSQL | 15 |
| Containerisation | Docker + Docker Compose | — |
| CI/CD | Jenkins | — |
