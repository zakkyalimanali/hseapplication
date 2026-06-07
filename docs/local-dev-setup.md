# Local Development Setup

Two ways to run the project locally: **Docker** (recommended, matches production) or **manual** (faster for backend-only changes).

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Docker Desktop | Latest | Required for Docker path |
| Python | 3.12+ | Required for manual path |
| Node.js | 18+ | Required for manual path |
| PostgreSQL | 15 | Required for manual path — see port note below |

---

## Option 1 — Docker (Recommended)

### 1. Clone and configure environment

```bash
git clone <repo-url>
cd hseapplication
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set at minimum:
```
SECRET_KEY=any-random-string-for-dev
DB_PASSWORD=postgres
```

### 2. Build and start containers

```bash
docker compose up --build
```

This starts three services:
- `db` — PostgreSQL 15 on internal port 5432
- `backend` — Django/Gunicorn on internal port 8000
- `frontend` — React + Nginx on published port **8080**

The backend `entrypoint.sh` runs automatically and:
1. Waits for the database to be ready
2. Runs `migrate_schemas` to create all tenant tables
3. Creates the public tenant record
4. Collects static files
5. Starts Gunicorn with 3 workers

### 3. Seed demo data

In a separate terminal:
```bash
docker compose exec backend python manage.py seed_ali_company
```

This creates the `alicompany` schema and populates it with 10 staff accounts and sample data across all modules.

### 4. Access the app

| URL | What |
|---|---|
| `http://localhost:8080` | React frontend (via Nginx) |
| `http://localhost:8000/admin/` | Django admin |
| `http://localhost:8000/api/` | REST API (browsable) |

### Default login

| Username | Password | Role |
|---|---|---|
| `ali.rahman` | `password123` | Company Admin |
| `sarah.abdullah` | `password123` | HSE Officer |
| `ahmad.hassan` | `password123` | Supervisor |
| `kevin.tan` | `password123` | Staff |

The frontend must be accessed from the `alicompany` subdomain for the tenant to resolve. In development this is typically `http://alicompany.localhost:8080` or `http://localhost:8080` depending on your Nginx config.

### 5. Stop containers

```bash
docker compose down
```

To also delete the database volume:
```bash
docker compose down -v
```

---

## Option 2 — Manual (No Docker)

### PostgreSQL port note

If you already have PostgreSQL installed locally (e.g. from another project), it likely runs on port **5432**. The project defaults to port **5433** in the local dev `.env` to avoid conflicts. Either:
- Configure your local Postgres to run on 5433, **or**
- Set `DB_PORT=5432` in your `.env` if your Postgres is on 5432

### Backend setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
```

Edit `.env`:
```
SECRET_KEY=any-random-string-for-dev
DEBUG=True
DB_NAME=hseapplication
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5433
ALLOWED_HOSTS=localhost,127.0.0.1
```

Run migrations — you must use `migrate_schemas`, not the standard `migrate`:
```bash
python manage.py migrate_schemas --noinput
```

Seed demo data:
```bash
python manage.py seed_ali_company
```

Start the development server:
```bash
python manage.py runserver
```

Backend runs at `http://localhost:8000`.

### Frontend setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000` and proxies API calls to `http://localhost:8000`.

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `SECRET_KEY` | Yes | — | Django secret key. Use any random string for dev. |
| `DEBUG` | No | `False` | Set `True` in development for detailed error pages. |
| `ALLOWED_HOSTS` | No | `localhost` | Comma-separated list of allowed hostnames. |
| `DB_NAME` | No | `hseapplication` | PostgreSQL database name. |
| `DB_USER` | No | `postgres` | PostgreSQL username. |
| `DB_PASSWORD` | Yes | — | PostgreSQL password. |
| `DB_HOST` | No | `localhost` | PostgreSQL hostname. Use `db` inside Docker. |
| `DB_PORT` | No | `5432` | PostgreSQL port. Use `5433` for local dev to avoid conflicts. |
| `CORS_ALLOWED_ORIGINS` | No | (allow all) | Comma-separated origins. Leave blank in dev to allow all. |
| `PUBLIC_DOMAIN` | No | `localhost` | Base domain for the public tenant record. |

---

## Common Tasks

### Run Django tests
```bash
# Manual
python manage.py test

# Docker
docker compose exec backend python manage.py test
```

### Run frontend tests
```bash
# Manual
cd frontend && npm test

# Docker
docker compose exec frontend npm test
```

### Create a new tenant manually
```bash
python manage.py shell
```
```python
from tenants.models import Client, Domain
t = Client(schema_name='newcompany', name='New Company')
t.save()
Domain.objects.create(domain='newcompany.localhost', tenant=t, is_primary=True)
```

Or use the API: `POST /api/tenants/create/` (see API Reference).

### Access a specific tenant schema in the shell
```bash
python manage.py tenant_command shell --schema=alicompany
```

Or use `schema_context` in a script:
```python
from django_tenants.utils import schema_context
with schema_context('alicompany'):
    from hseapp.models import Staff
    print(Staff.objects.count())
```

### Re-seed demo data
```bash
python manage.py seed_ali_company --clear
```

The `--clear` flag wipes the existing `alicompany` schema data before seeding.

---

## Troubleshooting

**`django.db.utils.OperationalError: could not connect to server`**
- Check PostgreSQL is running on the port in your `.env`
- Verify `DB_PASSWORD` is correct

**`ProgrammingError: relation "tenants_client" does not exist`**
- You ran `migrate` instead of `migrate_schemas`. Run `python manage.py migrate_schemas --noinput`

**Frontend shows blank page or API 404**
- In manual mode, check the backend is running on port 8000
- In Docker mode, check all three containers are healthy: `docker compose ps`

**Login fails after seeding**
- Make sure the frontend is accessing the app via the correct subdomain (e.g. `alicompany.localhost`) so the tenant middleware resolves to the right schema

**`No module named '...'`**
- Your virtual environment is not activated, or you ran `pip install` outside it
