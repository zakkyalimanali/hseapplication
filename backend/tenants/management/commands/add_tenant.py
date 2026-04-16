from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from django_tenants.utils import tenant_context
from tenants.models import Client, Domain


class Command(BaseCommand):
    help = 'Create a new tenant (company) with an admin user'

    def add_arguments(self, parser):
        parser.add_argument('--name', required=True, help='Company name, e.g. "PT Acme Corp"')
        parser.add_argument('--schema', required=True, help='Schema/subdomain slug, e.g. "acme" (lowercase, no spaces)')
        parser.add_argument('--domain', required=False, help='Custom domain (default: <schema>.localhost)')
        parser.add_argument('--admin-username', default='admin', help='Admin username (default: admin)')
        parser.add_argument('--admin-password', required=True, help='Admin password')
        parser.add_argument('--admin-email', default='', help='Admin email')

    def handle(self, *args, **options):
        schema = options['schema'].lower().replace(' ', '_')
        name = options['name']
        domain = options.get('domain') or f"{schema}.localhost"
        admin_username = options['admin_username']
        admin_password = options['admin_password']
        admin_email = options['admin_email']

        if Client.objects.filter(schema_name=schema).exists():
            raise CommandError(f"Tenant with schema '{schema}' already exists.")

        if Domain.objects.filter(domain=domain).exists():
            raise CommandError(f"Domain '{domain}' is already in use.")

        self.stdout.write(f"Creating tenant '{name}' (schema: {schema})...")
        tenant = Client(schema_name=schema, name=name)
        tenant.save()  # auto-creates PostgreSQL schema + runs all migrations

        Domain.objects.create(domain=domain, tenant=tenant, is_primary=True)
        self.stdout.write(f"  Domain: {domain}")

        with tenant_context(tenant):
            if User.objects.filter(username=admin_username).exists():
                self.stdout.write(self.style.WARNING(
                    f"  User '{admin_username}' already exists in this schema, skipping user creation."
                ))
            else:
                User.objects.create_superuser(
                    username=admin_username,
                    password=admin_password,
                    email=admin_email,
                )
                self.stdout.write(f"  Admin user: {admin_username}")

        self.stdout.write(self.style.SUCCESS(
            f"\nTenant '{name}' ready!\n"
            f"  App URL : http://{domain}:3000\n"
            f"  API URL : http://{domain}:8000\n"
            f"  Login   : {admin_username} / {admin_password}"
        ))
