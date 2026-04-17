"""
Custom test runner for django-tenants 3.x which ships no runner module.
Sets up the public schema before tests run so TenantTestCase can create
the test tenant schema without hitting "relation does not exist" errors.
"""
from django.test.runner import DiscoverRunner
from django.core.management import call_command


class TenantAwareTestRunner(DiscoverRunner):

    def setup_databases(self, **kwargs):
        result = super().setup_databases(**kwargs)
        # Migrate the public (shared) schema so the tenants/domains tables exist
        call_command('migrate_schemas', schema_name='public', interactive=False, verbosity=0)
        return result
