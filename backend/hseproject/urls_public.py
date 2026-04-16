"""
URL configuration for the PUBLIC (shared) schema.
This is served when accessing the root domain (e.g. localhost:8000).
It exposes only tenant management endpoints and the Django admin.
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
