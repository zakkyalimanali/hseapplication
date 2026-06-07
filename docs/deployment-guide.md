# Deployment & Infrastructure Guide

Deployments are automated via Jenkins. Pushing to the `main` branch triggers the full pipeline: test → build → deploy to VPS.

---

## Infrastructure

| Resource | Value |
|---|---|
| VPS IP | `206.189.33.58` |
| SSH user | `root` |
| App directory on VPS | `/root/hseapplication` |
| Published port | `8080` (Nginx) |
| Jenkins SSH credential | `vps-ssh-credentials` |

---

## CI/CD Pipeline (Jenkinsfile)

The pipeline has 4 stages. All stages run on any available Jenkins agent.

### Stage 1 — Checkout

Checks out the repository from source control.

### Stage 2 — Backend Tests

Spins up a temporary PostgreSQL container and runs Django tests:

```
postgres:15-alpine
  DB: test_hse
  User: postgres
  Password: testpass
  Network: container:jenkins (shares Jenkins agent's network namespace)
```

Steps:
1. Create Python virtual environment in `backend/`
2. `pip install -r requirements.txt`
3. `python manage.py test hseapp`

The test stage is currently configured to allow failures (`|| true`) so a test failure does not block the build. Remove that flag when you want tests to gate deployments.

Cleanup: Removes the temporary postgres container whether the tests pass or fail.

### Stage 3 — Build Docker Images

```bash
docker compose build
```

Builds both the backend and frontend images using their respective Dockerfiles. Uses the current `BUILD_NUMBER` as the image tag.

### Stage 4 — Deploy to VPS

**Only runs when the branch is `main`.**

Branch condition checks:
- `GIT_BRANCH == 'origin/main'`
- `GIT_BRANCH == 'main'`
- `BRANCH_NAME == 'main'`

Deployment steps (over SSH using `vps-ssh-credentials`):

```bash
cd /root/hseapplication
git fetch origin main
git reset --hard origin/main     # discard any local drift
docker compose down              # stop all running services
docker compose up -d --build     # rebuild and start fresh
```

After `docker compose up`, `entrypoint.sh` runs automatically and handles:
1. Waiting for the database to be ready
2. Running `migrate_schemas --noinput` (applies any new migrations)
3. Bootstrapping the public tenant (if missing)
4. Collecting static files
5. Starting Gunicorn

**Downtime:** There is a brief gap between `docker compose down` and the containers being healthy again. The database and media volumes persist across this restart — no data is lost.

---

## Dockerfiles

### Backend (`backend/Dockerfile`)

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN chmod +x entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]
```

- Slim base image keeps the image small
- Dependencies installed before copying source (layer caching — rebuilds are fast if only source changes)
- Port 8000 is internal; not published to the host

### Frontend (`frontend/Dockerfile`)

Multi-stage build:

**Stage 1 — Build (Node 18)**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=512 npm run build
```

**Stage 2 — Runtime (Nginx Alpine)**
```dockerfile
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Only the compiled `/app/build` output is copied to the final image — no `node_modules` or source files. This keeps the runtime image small.

The Node memory cap (`--max_old_space_size=512`) prevents the build from crashing on low-memory VPS environments.

---

## Entrypoint Script (`backend/entrypoint.sh`)

Runs every time the backend container starts. Sequence:

```
1. Poll database until connection succeeds (retries every 2s)
2. python manage.py migrate_schemas --noinput
3. Bootstrap public tenant:
     if Client(schema_name='public') doesn't exist:
       create Client + Domain(PUBLIC_DOMAIN)
4. python manage.py collectstatic --noinput
5. exec gunicorn hseproject.wsgi:application \
       --bind 0.0.0.0:8000 \
       --workers 3
```

The `exec` on the last step replaces the shell process with Gunicorn, so Docker signals (stop/kill) are delivered directly to Gunicorn rather than the shell.

---

## Manual Deployment (Without Jenkins)

If Jenkins is unavailable or you need to deploy a hotfix manually:

```bash
ssh root@206.189.33.58
cd /root/hseapplication
git fetch origin main
git reset --hard origin/main
docker compose down
docker compose up -d --build
```

Monitor the startup:
```bash
docker compose logs -f backend
```

Watch for `Booting worker with pid:` lines to confirm Gunicorn started successfully.

---

## Persistent Data

Two Docker volumes survive `docker compose down` and rebuild:

| Volume | Mount point | What it stores |
|---|---|---|
| `postgres_data` | `/var/lib/postgresql/data` | All database data (all tenant schemas) |
| `media_files` | `/app/media` | User-uploaded files (photos, documents) |

**Never run `docker compose down -v`** in production — the `-v` flag deletes volumes and you will lose all data.

---

## Rollback

There is no automated rollback in the current pipeline. To roll back to a previous state:

```bash
ssh root@206.189.33.58
cd /root/hseapplication

# Find the commit you want to roll back to
git log --oneline -10

# Roll back to that commit
git reset --hard <commit-hash>

# Rebuild and restart
docker compose down
docker compose up -d --build
```

If the rollback also requires undoing a migration, that must be done manually before restarting:

```bash
docker compose exec backend python manage.py migrate_schemas hseapp <migration_name> --noinput
```

---

## Checking Service Health

```bash
# On the VPS
docker compose ps              # check all containers are Up
docker compose logs backend    # backend startup logs
docker compose logs frontend   # nginx logs
docker compose logs db         # postgres logs

# Check if the API is responding
curl http://localhost:8000/api/tenant/info/
```

---

## Environment Configuration on VPS

The backend reads from `backend/.env` at `/root/hseapplication/backend/.env`. This file is **not** tracked in git (listed in `.gitignore`) and must be created manually on the VPS.

Minimum required variables for production:

```env
SECRET_KEY=<long-random-string>
DEBUG=False
ALLOWED_HOSTS=206.189.33.58,yourdomain.com,.yourdomain.com
DB_NAME=hseapplication
DB_USER=postgres
DB_PASSWORD=<strong-password>
DB_HOST=db
DB_PORT=5432
CORS_ALLOWED_ORIGINS=https://yourdomain.com
PUBLIC_DOMAIN=yourdomain.com
```

See [Environment Variables Reference](environment-variables.md) for full details on each variable.

---

## Docker Compose Summary

```yaml
services:
  db:
    image: postgres:15-alpine
    volumes: [postgres_data]
    healthcheck: pg_isready (10s interval, 5 retries)

  backend:
    build: ./backend
    env_file: ./backend/.env
    depends_on: db (healthy)
    volumes: [media_files]

  frontend:
    build: ./frontend
    ports: ["8080:80"]
    depends_on: backend
```
