"""
URL configuration for the PUBLIC (shared) schema.
This is served when accessing the root domain (e.g. localhost:8000).
It exposes only tenant management endpoints and the Django admin.
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from tenants import views as tenant_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tenants/create/', tenant_views.create_tenant, name='create_tenant'),
    path('api/tenants/list/', tenant_views.list_tenants, name='list_tenants'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
