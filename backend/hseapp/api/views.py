from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Standard claims
        token['username'] = user.username

        # Tenant claim — tells the frontend which schema/subdomain this user belongs to
        from django.db import connection
        token['tenant_schema'] = connection.schema_name

        # Include linked staff ID so the frontend can auto-fill "Raised By" fields
        try:
            token['staff_id'] = user.staff_profile.id
        except Exception:
            token['staff_id'] = None

        # Include role — company admins (Django superusers) get company_admin automatically
        if user.is_superuser:
            token['role'] = 'company_admin'
        else:
            try:
                token['role'] = user.staff_profile.role
            except Exception:
                token['role'] = 'staff'

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/register',
    ]
    return Response(routes)


@api_view(['GET'])
@permission_classes([])
def tenantInfo(request):
    from django.db import connection
    from django_tenants.utils import get_public_schema_name
    schema = connection.schema_name
    if schema == get_public_schema_name():
        return Response({'name': 'Platform Admin', 'schema': schema})
    try:
        from tenants.models import Client
        client = Client.objects.get(schema_name=schema)
        return Response({'name': client.name, 'schema': schema})
    except Exception:
        return Response({'name': schema, 'schema': schema})


VALID_ROLES = {'staff', 'supervisor', 'hse_officer', 'company_admin'}

@api_view(['POST'])
def registerUser(request):
    data = request.data
    username  = data.get('username', '').strip()
    full_name = data.get('full_name', '').strip()
    email     = data.get('email', '').strip()
    password  = data.get('password', '')
    password2 = data.get('password2', '')
    role      = data.get('role', 'staff').strip()

    errors = {}
    if not username:
        errors['username'] = 'Username is required.'
    elif User.objects.filter(username=username).exists():
        errors['username'] = 'Username already taken.'

    if not full_name:
        errors['full_name'] = 'Full name is required.'

    if not password:
        errors['password'] = 'Password is required.'
    elif len(password) < 8:
        errors['password'] = 'Password must be at least 8 characters.'
    elif password != password2:
        errors['password2'] = 'Passwords do not match.'

    if role not in VALID_ROLES:
        role = 'staff'

    if errors:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)

    # Link to an existing Staff record with the same name, or create a new one
    from hseapp.models import Staff
    existing = Staff.objects.filter(
        name__iexact=full_name, user__isnull=True
    ).first()
    if existing:
        existing.user = user
        existing.role = role
        existing.save()
    else:
        Staff.objects.create(user=user, name=full_name, role=role)

    return Response({'detail': 'Account created. You can now log in.'}, status=status.HTTP_201_CREATED)