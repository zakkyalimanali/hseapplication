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


@api_view(['POST'])
def registerUser(request):
    data = request.data
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    password2 = data.get('password2', '')

    errors = {}
    if not username:
        errors['username'] = 'Username is required.'
    elif User.objects.filter(username=username).exists():
        errors['username'] = 'Username already taken.'

    if not password:
        errors['password'] = 'Password is required.'
    elif len(password) < 8:
        errors['password'] = 'Password must be at least 8 characters.'
    elif password != password2:
        errors['password2'] = 'Passwords do not match.'

    if errors:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    User.objects.create_user(username=username, email=email, password=password)
    return Response({'detail': 'Account created. You can now log in.'}, status=status.HTTP_201_CREATED)