# HSE Application

A multi-tenant Health, Safety & Environment (HSE) management system built with Django REST Framework and React. Each company gets its own isolated database schema so data is fully separated between tenants.

---

## Modules

| Module | Description |
|---|---|
| Staff | Staff profiles linked to user accounts |
| Attendance | Daily attendance tracking with quick-mark view |
| Training | Training records and expiry tracking |
| Safety Cards | Hazard observations and resolution tracking |
| Incident Reports | Incident recording with photos and event log |
| Incident Investigation | Investigation team management, factors, findings |
| Permit to Work | PTW with hazards, physical controls, signatures |
| Job Safety Analysis | JSA with steps, hazards, equipment |
| Risk Register | Risk register by project with mitigation tracking |
| Site Visit | Site visit reports with hazards and attendees |
| Toolbox Talk | Toolbox talk records |
| News & Blog | Internal news articles and blog posts |
| HSE Management | HSE management documentation |
| HSE References | Reference documents and resources |
| Equipment | Equipment register |
| Reporting | Summary reporting |
| Charts & Stats | Dashboard charts and statistics |

---

## Tech Stack

**Backend**
- Python / Django 6 + Django REST Framework
- django-tenants (PostgreSQL multi-schema)
- SimpleJWT (JWT authentication with custom claims)
- Gunicorn (production server)

**Frontend**
- React 18
- React Router v6
- Axios
- Bootstrap 5 + RSuite

**Infrastructure**
- PostgreSQL 15
- Docker + Docker Compose
- Nginx (serves frontend, proxies API)

---

## Local Development (without Docker)

### Prerequisites
- Python 3.11+
- Node 18+
- PostgreSQL running on port 5433

### Backend

```bash
cd backend
python -m venv venv
source venv/Scripts/activate        # Windows
# source venv/bin/activate          # Mac/Linux

pip install -r requirements.txt

# Copy env file and fill in your values
cp .env.example .env

# Run migrations for all schemas
python manage.py migrate_schemas

# Seed initial tenant data
python manage.py seed_ali_company

# Start dev server
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The React app runs on `http://localhost:3000` and calls the backend at `http://{hostname}:8000`.

---

## Running with Docker

### Prerequisites
- Docker Desktop installed and running

### First-time setup

1. Copy the env example and set your values:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. At minimum set these in `backend/.env`:
   ```
   SECRET_KEY=your-secret-key
   DB_PASSWORD=your-db-password
   ```

3. Build and start all services:
   ```bash
   docker compose up --build
   ```

4. In a separate terminal, run migrations and seed data:
   ```bash
   docker compose exec backend python manage.py migrate_schemas
   docker compose exec backend python manage.py seed_ali_company
   ```

5. Open `http://localhost` in your browser.

### Subsequent starts

```bash
docker compose up
```

### Stop

```bash
docker compose down
```

To also remove the database volume (wipes all data):
```bash
docker compose down -v
```

---

## Environment Variables

All secrets and environment-specific config live in `backend/.env`. See `backend/.env.example` for the full list.

| Variable | Description | Default |
|---|---|---|
| `SECRET_KEY` | Django secret key | insecure dev key |
| `DEBUG` | Enable debug mode | `True` |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts | `localhost` |
| `DB_NAME` | Database name | `hseapplication` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | — |
| `DB_HOST` | Database host | `localhost` (`db` in Docker) |
| `DB_PORT` | Database port | `5432` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed origins (production) | allow all |

---

## Running Tests

### Backend

```bash
cd backend
source venv/Scripts/activate
python manage.py test hseapp
```

Tests are split by feature area under `hseapp/tests/`:

```
tests/
├── helpers.py            — shared make_user() and auth_client()
├── test_models.py        — model-level tests
├── test_auth.py          — registration API and JWT token tests
├── test_staff.py         — Staff API
├── test_attendance.py    — Attendance API
├── test_training.py      — Training API
├── test_safety.py        — Safety Card API
└── test_investigation.py — Investigation Team Member API
```

Run a single module:
```bash
python manage.py test hseapp.tests.test_attendance
```

### Frontend

```bash
cd frontend
npm test
```

Test files are under `src/__tests__/` organised by feature area:
```
__tests__/
├── auth/           — LoginPage, RegisterPage
├── attendance/     — AttendenceList
└── news/           — NewsAdd
```

---

## Project Structure

```
hseapplication/
├── backend/
│   ├── hseapp/          — main Django app (models, views, serializers)
│   ├── hseproject/      — Django project config (settings, urls)
│   ├── tenants/         — Tenant and Domain models
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── API/         — Axios instances per resource
│   │   ├── pages/       — React page components
│   │   ├── context/     — AuthContext (JWT + tenant state)
│   │   └── __tests__/   — Test suites
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
└── .gitignore
```

---

## Default Login

After seeding, log in with the credentials created by `seed_ali_company`.
Access the app at `http://defaultcompany.localhost:3000` (local dev) or `http://localhost` (Docker).
