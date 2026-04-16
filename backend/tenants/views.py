import re
from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django_tenants.utils import schema_context

from .models import Client, Domain


@api_view(['POST'])
@permission_classes([AllowAny])
def create_tenant(request):
    data = request.data
    name = data.get('name', '').strip()
    subdomain = data.get('subdomain', '').strip().lower()
    admin_username = data.get('admin_username', '').strip()
    admin_password = data.get('admin_password', '')

    errors = {}

    if not name:
        errors['name'] = 'Company name is required.'

    if not subdomain:
        errors['subdomain'] = 'Subdomain is required.'
    elif not re.match(r'^[a-z0-9][a-z0-9\-]*$', subdomain):
        errors['subdomain'] = 'Subdomain can only contain lowercase letters, numbers, and hyphens.'
    elif subdomain in ('public', 'admin', 'www', 'api'):
        errors['subdomain'] = f'"{subdomain}" is a reserved subdomain.'
    elif Client.objects.filter(schema_name=subdomain).exists():
        errors['subdomain'] = 'This subdomain is already taken.'

    if not admin_username:
        errors['admin_username'] = 'Admin username is required.'

    if not admin_password:
        errors['admin_password'] = 'Admin password is required.'
    elif len(admin_password) < 8:
        errors['admin_password'] = 'Password must be at least 8 characters.'

    if errors:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    # Create the tenant — auto_create_schema=True runs migrations automatically
    tenant = Client(schema_name=subdomain, name=name)
    tenant.save()

    domain = Domain(domain=f'{subdomain}.localhost', tenant=tenant, is_primary=True)
    domain.save()

    # Create admin user inside the new tenant schema
    with schema_context(subdomain):
        from django.contrib.auth.models import User
        User.objects.create_superuser(
            username=admin_username,
            email='',
            password=admin_password,
        )

    return Response({
        'detail': f'Tenant "{name}" created successfully.',
        'app_url': f'http://{subdomain}.localhost:3000',
        'admin_url': f'http://{subdomain}.localhost:8000/admin/',
        'subdomain': subdomain,
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_tenants(request):
    tenants = Client.objects.exclude(schema_name='public').values(
        'id', 'name', 'schema_name', 'created_on'
    )
    result = []
    for t in tenants:
        domain = Domain.objects.filter(tenant__schema_name=t['schema_name'], is_primary=True).first()
        result.append({
            **t,
            'subdomain': domain.domain if domain else t['schema_name'],
            'app_url': f"http://{domain.domain}:3000" if domain else None,
        })
    return Response(result)
