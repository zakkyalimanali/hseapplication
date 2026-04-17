import json
from django.contrib.auth.models import User
from django_tenants.test.client import TenantClient

from hseapp.models import Staff


def make_user(username='testuser', password='testpass123', full_name='Test User'):
    user = User.objects.create_user(username=username, password=password)
    Staff.objects.create(user=user, name=full_name)
    return user


def auth_client(user, tenant, password='testpass123'):
    """Return a TenantClient pre-loaded with a JWT Bearer token."""
    client = TenantClient(tenant)
    res = client.post(
        '/api/token/',
        json.dumps({'username': user.username, 'password': password}),
        content_type='application/json',
    )
    token = res.json().get('access', '')
    client.defaults['HTTP_AUTHORIZATION'] = f'Bearer {token}'
    return client
