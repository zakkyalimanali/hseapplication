# Multi-Tenancy Guide

The HSE application uses `django-tenants` to give each company a fully isolated PostgreSQL schema. This means every company's data lives in a separate schema within the same database — no shared tables, no data leakage between tenants.

---

## How It Works

### Schema-per-tenant model

PostgreSQL supports multiple schemas within a single database. Each schema is like its own namespace — it has its own set of tables. When a request comes in, Django switches the database connection to the appropriate schema before running any query.

```
hseapplication database
├── public schema        ← shared: tenants list, domain mappings
├── alicompany schema    ← all HSE data for Ali Company
├── betacorp schema      ← all HSE data for Beta Corp
└── gammatech schema     ← all HSE data for Gamma Tech
```

### Request flow

1. A request arrives at `alicompany.localhost:8000/api/incident/`
2. `TenantMainMiddleware` (first in the middleware stack) extracts `alicompany.localhost` from the `Host` header
3. It looks up the `Domain` table in the public schema — finds a match pointing to the `alicompany` schema
4. It sets `connection.schema_name = 'alicompany'` on the database connection
5. All subsequent queries in that request hit the `alicompany` schema automatically
6. Django REST Framework returns only Ali Company's data

No explicit `WHERE tenant_id = ...` is needed in any query — the schema switch handles isolation at the database level.

---

## Data Models

### Client (Tenant)

Defined in `backend/tenants/models.py`:

```python
class Client(TenantMixin):
    name = CharField(max_length=100)      # Human-readable company name
    created_on = DateField(auto_now_add=True)
    auto_create_schema = True             # Runs migrations automatically on save
```

`auto_create_schema = True` means that when you call `client.save()`, `django-tenants` immediately creates the new PostgreSQL schema and runs all tenant-app migrations inside it.

### Domain

```python
class Domain(DomainMixin):
    # Inherited fields: domain (str), tenant (FK to Client), is_primary (bool)
```

Each `Client` can have multiple `Domain` entries. The `is_primary` flag marks the canonical domain.

---

## Shared vs Tenant Apps

Defined in `backend/hseproject/settings.py`:

### SHARED_APPS (public schema only)
These apps have their tables in the `public` schema:
- `django_tenants` — core tenancy machinery
- `tenants` — Client and Domain models
- `django.contrib.auth` — shared user accounts
- `django.contrib.admin` — admin site
- `django.contrib.contenttypes`
- `django.contrib.sessions`
- `django.contrib.messages`
- `django.contrib.staticfiles`
- `rest_framework`
- `corsheaders`
- `whitenoise`

### TENANT_APPS (replicated per tenant schema)
These apps get their own tables in every tenant's schema:
- `hseapp` — all HSE data (Staff, Incident, Training, etc.)
- `rest_framework_simplejwt.token_blacklist` — JWT token management per tenant

`INSTALLED_APPS` is automatically set to `SHARED_APPS + TENANT_APPS` by `django-tenants`.

---

## URL Routing

Two separate URL configurations:

| Config | File | When used |
|---|---|---|
| `ROOT_URLCONF` | `hseproject/urls.py` | Any request matching a tenant domain |
| `PUBLIC_SCHEMA_URLCONF` | `hseproject/urls_public.py` | Requests matching the public domain |

This means `/api/tenants/create/` is only reachable from the root domain (e.g. `localhost`), and `/api/incident/` is only reachable from a tenant subdomain.

---

## Creating a New Tenant

### Via API (recommended for production)

`POST /api/tenants/create/` on the public domain:

```json
{
  "name": "Gamma Tech",
  "subdomain": "gammatech",
  "admin_username": "admin",
  "admin_password": "securepass123"
}
```

What happens internally:
1. `Client(schema_name='gammatech', name='Gamma Tech').save()` — creates schema + runs migrations
2. `Domain(domain='gammatech.localhost', tenant=client, is_primary=True)` — maps subdomain to tenant
3. Switches into `gammatech` schema context and creates a Django superuser with the provided credentials

The new tenant is immediately usable. No server restart required.

### Via Django shell (for ops/dev use)

```python
from tenants.models import Client, Domain

client = Client(schema_name='newcompany', name='New Company')
client.save()  # Creates schema and runs migrations

Domain.objects.create(
    domain='newcompany.localhost',
    tenant=client,
    is_primary=True
)
```

---

## Migrations

### Running migrations for all tenants

```bash
python manage.py migrate_schemas --noinput
```

This is the command to use instead of the standard `migrate`. It:
1. Migrates shared apps in the `public` schema
2. Migrates tenant apps in every existing tenant schema

### When you add a new Django app or model

Add the app to either `SHARED_APPS` or `TENANT_APPS` in settings, then run:

```bash
python manage.py migrate_schemas --noinput
```

If the app is a tenant app, every existing tenant schema gets the new tables automatically.

### In Docker / production

`entrypoint.sh` runs `migrate_schemas --noinput` automatically on every container start. New tenant schemas created via the API get migrated immediately by `auto_create_schema = True`.

---

## The Public Tenant

The `public` schema has a corresponding `Client` record that is bootstrapped by `entrypoint.sh` at startup:

```python
if not Client.objects.filter(schema_name='public').exists():
    t = Client(schema_name='public', name='Public')
    t.save()
    Domain.objects.get_or_create(
        domain=PUBLIC_DOMAIN,
        defaults={'tenant': t, 'is_primary': True}
    )
```

`PUBLIC_DOMAIN` comes from the environment variable (defaults to `localhost`). The public tenant serves the tenant-management API (`/api/tenants/`) and the Django admin.

---

## Demo Data (Seed Command)

```bash
python manage.py seed_ali_company
```

Options:
```
--schema alicompany    Schema name (default: alicompany)
--clear               Wipe existing data first
```

Creates the `alicompany` tenant (if it doesn't exist) and seeds 10 staff members with demo records across all modules. The seed command uses `schema_context` to write data into the correct schema:

```python
from django_tenants.utils import schema_context

with schema_context('alicompany'):
    Staff.objects.create(...)
```

---

## JWT Tokens and Tenancy

Every JWT access token includes a `tenant_schema` claim (injected by `MyTokenObtainPairSerializer`):

```python
token['tenant_schema'] = self.user.client.schema_name
# or: connection.schema_name at time of login
```

The frontend reads this claim to know which tenant the logged-in user belongs to. The backend validates tenancy on each request via the `TenantMainMiddleware` — the token's `tenant_schema` claim is informational for the frontend only.

---

## Working in a Tenant Schema (Shell)

To run management commands inside a specific tenant schema:

```bash
python manage.py tenant_command shell --schema=alicompany
```

To query a tenant schema from a script:

```python
from django_tenants.utils import schema_context

with schema_context('alicompany'):
    from hseapp.models import Incident
    print(Incident.objects.count())
```

---

## Important Constraints

- **Never use `migrate` alone** — it only runs public schema migrations. Always use `migrate_schemas`.
- **Staff model is per-tenant** — there is no global staff list. Each tenant has their own `Staff`, `User`, and all related records.
- **Django admin** (`/admin/`) operates on the public schema by default. To manage tenant-schema data through admin, you need to access it from a tenant subdomain.
- **Reserved subdomains** — `public`, `admin`, `www`, `api` cannot be used as tenant subdomains.
- **Schema name = subdomain** — once set, the schema name cannot be changed without manual database work. Choose subdomain names carefully.
