# Environment Variables Reference

All environment variables are read from `backend/.env` using `python-decouple`. The lookup order is: `.env` file → OS environment → default value.

The template file is at `backend/.env.example`. Copy it to `backend/.env` before running the application.

---

## Quick Reference

| Variable | Required | Default | Change for Production |
|---|---|---|---|
| `SECRET_KEY` | Yes | insecure dev key | Yes — must be changed |
| `DEBUG` | No | `True` | Yes — set to `False` |
| `ALLOWED_HOSTS` | No | `localhost,.localhost,127.0.0.1` | Yes — add your domain |
| `DB_NAME` | No | `hseapplication` | Optional |
| `DB_USER` | No | `postgres` | Optional |
| `DB_PASSWORD` | Yes | _(empty)_ | Yes |
| `DB_HOST` | No | `localhost` | Yes — use `db` in Docker |
| `DB_PORT` | No | `5432` | Yes — use `5433` for local dev |
| `CORS_ALLOWED_ORIGINS` | No | _(empty = allow all)_ | Yes — restrict to your domain |
| `PUBLIC_DOMAIN` | No | _(empty)_ | Yes — set to your domain |

---

## Variable Details

### SECRET_KEY

```
SECRET_KEY=django-insecure-replace-this-with-a-long-random-string
```

**What it does:** Used by Django to sign session cookies, CSRF tokens, password reset links, and other cryptographic operations. Anyone with this key can forge authentication tokens.

**In production:** Generate a strong random key:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

**Setting in:** `settings.py` → `SECRET_KEY`

---

### DEBUG

```
DEBUG=True
```

**What it does:** When `True`, Django shows detailed error pages with stack traces and local variable values. When `False`, Django shows a generic 500 error page.

**In production:** Always set to `False`. Leaving `DEBUG=True` in production leaks sensitive configuration and code to any user who triggers an error.

**Type:** Boolean (`True` or `False`)

**Setting in:** `settings.py` → `DEBUG`

---

### ALLOWED_HOSTS

```
ALLOWED_HOSTS=localhost,.localhost,127.0.0.1
```

**What it does:** Whitelist of hostnames Django will respond to. Requests from any other hostname get a 400 Bad Request. The leading dot (`.localhost`) is a wildcard that matches all subdomains of `localhost`.

**In production:** Add your VPS IP and domain:
```
ALLOWED_HOSTS=206.189.33.58,yourdomain.com,.yourdomain.com
```

**Type:** Comma-separated string (parsed as a list internally)

**Setting in:** `settings.py` → `ALLOWED_HOSTS`

---

### DB_NAME

```
DB_NAME=hseapplication
```

**What it does:** Name of the PostgreSQL database. Must match the database created by the `POSTGRES_DB` variable in docker-compose.

**Setting in:** `settings.py` → `DATABASES['default']['NAME']`

---

### DB_USER

```
DB_USER=postgres
```

**What it does:** PostgreSQL username for the application to authenticate with.

**Setting in:** `settings.py` → `DATABASES['default']['USER']`

---

### DB_PASSWORD

```
DB_PASSWORD=your_password_here
```

**What it does:** Password for the PostgreSQL user. No default — leaving it empty will cause a connection failure.

**In production:** Use a strong, randomly generated password.

**Setting in:** `settings.py` → `DATABASES['default']['PASSWORD']`

---

### DB_HOST

```
DB_HOST=localhost
```

**What it does:** Hostname or IP of the PostgreSQL server.

**Values by environment:**
| Environment | Value |
|---|---|
| Local (manual) | `localhost` |
| Docker Compose | `db` (the service name) |

Docker Compose overrides this via the `environment` block in `docker-compose.yml`, setting it to `db` regardless of what is in `.env`.

**Setting in:** `settings.py` → `DATABASES['default']['HOST']`

---

### DB_PORT

```
DB_PORT=5432
```

**What it does:** Port the PostgreSQL server is listening on.

**Values by environment:**
| Environment | Value | Note |
|---|---|---|
| Docker Compose | `5432` | Standard PostgreSQL port |
| Local (manual) | `5433` | Use if port 5432 is occupied by another Postgres install |

**Setting in:** `settings.py` → `DATABASES['default']['PORT']`

---

### CORS_ALLOWED_ORIGINS

```
CORS_ALLOWED_ORIGINS=
```

**What it does:** Controls which browser origins (domains) are allowed to make cross-origin API requests.

**Behaviour:**
- If **empty**: `CORS_ALLOW_ALL_ORIGINS = True` — any origin is allowed. Safe for local development.
- If **set**: Only the listed origins are allowed. All others get a CORS error.

**In production:**
```
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

**Note:** `PUBLIC_DOMAIN` (see below) also automatically adds a regex pattern allowing all subdomains of the configured base domain. You do not need to list every subdomain individually if `PUBLIC_DOMAIN` is set.

**Type:** Comma-separated list of URLs (e.g. `https://example.com`)

**Setting in:** `settings.py` → `CORS_ALLOWED_ORIGINS` or `CORS_ALLOW_ALL_ORIGINS`

---

### PUBLIC_DOMAIN

```
PUBLIC_DOMAIN=yourdomain.com
```

**What it does:** Two things:

1. **Entrypoint bootstrap:** `entrypoint.sh` uses this to create the public tenant's `Domain` record in the database on first start. Without this, the public schema routes (tenant creation, etc.) won't resolve correctly.

2. **CORS subdomain matching:** Adds a regex to `CORS_ALLOWED_ORIGIN_REGEXES` that allows `https://*.yourdomain.com` — so any tenant subdomain is automatically permitted without listing each one.

**In production:** Set to your base domain (without protocol or subdomain):
```
PUBLIC_DOMAIN=yourdomain.com
```

**In development:** Leave empty or set to `localhost`. The entrypoint defaults to `localhost` if this is not set.

**Setting in:** `settings.py` → `CORS_ALLOWED_ORIGIN_REGEXES`; `entrypoint.sh` → Domain creation

---

## Docker Compose Environment Overrides

When running with Docker Compose, two variables are forced by the `docker-compose.yml` environment block, overriding whatever is in `.env`:

| Variable | Forced value | Reason |
|---|---|---|
| `DB_HOST` | `db` | Service name of the PostgreSQL container |
| `DB_PORT` | `5432` | Internal container port |

You do not need to set these in `.env` when using Docker.

---

## Production Checklist

Before deploying to production, confirm these variables are set correctly in `backend/.env` on the VPS:

- [ ] `SECRET_KEY` — unique, random, at least 50 characters
- [ ] `DEBUG` — set to `False`
- [ ] `ALLOWED_HOSTS` — includes your VPS IP and domain
- [ ] `DB_PASSWORD` — strong password, matches `POSTGRES_PASSWORD` in docker-compose
- [ ] `DB_HOST` — set to `db` (for Docker)
- [ ] `CORS_ALLOWED_ORIGINS` — restricted to your actual frontend URL(s)
- [ ] `PUBLIC_DOMAIN` — set to your base domain
