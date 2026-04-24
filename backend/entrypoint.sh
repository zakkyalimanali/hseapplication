#!/bin/sh
set -e

echo "Waiting for database..."
until python -c "
import os, psycopg2
psycopg2.connect(
    host=os.environ.get('DB_HOST', 'db'),
    port=os.environ.get('DB_PORT', '5432'),
    dbname=os.environ.get('DB_NAME', 'hseapplication'),
    user=os.environ.get('DB_USER', 'postgres'),
    password=os.environ.get('DB_PASSWORD', ''),
)" 2>/dev/null; do
    echo "  db not ready, retrying in 2s..."
    sleep 2
done
echo "Database is ready."

echo "Running migrations..."
python manage.py migrate_schemas --noinput

echo "Bootstrapping public tenant..."
python manage.py shell -c "
from tenants.models import Client, Domain
import os
if not Client.objects.filter(schema_name='public').exists():
    t = Client(schema_name='public', name='Public')
    t.save()
    domain = os.environ.get('PUBLIC_DOMAIN', 'localhost')
    Domain.objects.get_or_create(domain=domain, defaults={'tenant': t, 'is_primary': True})
    print('Public tenant created for domain:', domain)
else:
    print('Public tenant already exists.')
"

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting server..."
exec gunicorn hseproject.wsgi:application --bind 0.0.0.0:8000 --workers 3
