import json
from django_tenants.test.cases import TenantTestCase
from django_tenants.test.client import TenantClient

from hseapp.models import Staff
from .helpers import make_user, auth_client


class StaffAPITest(TenantTestCase):

    def setUp(self):
        self.user = make_user()
        self.api = auth_client(self.user, self.tenant)
        self.other_staff = Staff.objects.create(name='Another Person', position='Engineer')

    def test_list_staff_authenticated(self):
        res = self.api.get('/hseapp/staff/')
        self.assertEqual(res.status_code, 200)
        self.assertIsInstance(res.json(), list)

    def test_list_staff_unauthenticated(self):
        # Views use IsAuthenticatedOrReadOnly — unauthenticated reads are allowed
        res = TenantClient(self.tenant).get('/hseapp/staff/')
        self.assertEqual(res.status_code, 200)

    def test_create_staff(self):
        res = self.api.post('/hseapp/staff/', {'name': 'New Staff', 'position': 'Driver'}, format='json')
        self.assertEqual(res.status_code, 201)
        self.assertTrue(Staff.objects.filter(name='New Staff').exists())

    def test_retrieve_staff(self):
        res = self.api.get(f'/hseapp/staff/{self.other_staff.id}/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()['name'], 'Another Person')

    def test_update_staff(self):
        res = self.api.patch(f'/hseapp/staff/{self.other_staff.id}/',
                             json.dumps({'position': 'Senior Engineer'}),
                             content_type='application/json')
        self.assertEqual(res.status_code, 200)
        self.other_staff.refresh_from_db()
        self.assertEqual(self.other_staff.position, 'Senior Engineer')

    def test_delete_staff(self):
        res = self.api.delete(f'/hseapp/staff/{self.other_staff.id}/')
        self.assertEqual(res.status_code, 204)
        self.assertFalse(Staff.objects.filter(id=self.other_staff.id).exists())
