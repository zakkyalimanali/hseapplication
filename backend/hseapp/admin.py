from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django_tenants.utils import get_public_schema_name
from django.db import connection
from .models import HSEManagement, Incident, Staff


class TenantAwareUserAdmin(UserAdmin):
    def tenant(self, obj):
        schema = connection.schema_name
        if schema == get_public_schema_name():
            return 'Public (Global)'
        # Try to get the friendly name from the Client model
        try:
            from tenants.models import Client
            client = Client.objects.get(schema_name=schema)
            return client.name
        except Exception:
            return schema

    tenant.short_description = 'Tenant'

    list_display = UserAdmin.list_display + ('tenant',)


admin.site.unregister(User)
admin.site.register(User, TenantAwareUserAdmin)

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'role', 'position', 'staff_id_number')
    list_editable = ('role',)
    list_filter = ('role',)
    search_fields = ('name', 'user__username', 'staff_id_number')
    fields = ('user', 'role', 'name', 'position', 'staff_id_number', 'gender', 'nationality', 'citizenship', 'home_address', 'date_of_birth', 'joining_date', 'smart_card_number', 'smart_card_colour')


admin.site.register(HSEManagement)
admin.site.register(Incident)