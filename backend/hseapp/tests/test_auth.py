from django.contrib.auth.models import User
from django_tenants.test.cases import TenantTestCase
from django_tenants.test.client import TenantClient

from hseapp.models import Staff


class RegistrationAPITest(TenantTestCase):

    def setUp(self):
        self.client = TenantClient(self.tenant)

    def post(self, data):
        return self.client.post('/api/register/', data, content_type='application/json')

    def test_register_creates_user_and_staff(self):
        res = self.post({'username': 'newuser', 'full_name': 'New User',
                         'password': 'secure123', 'password2': 'secure123'})
        self.assertEqual(res.status_code, 201)
        self.assertTrue(User.objects.filter(username='newuser').exists())
        self.assertTrue(Staff.objects.filter(name='New User').exists())

    def test_register_links_existing_unlinked_staff(self):
        """Should link to an existing Staff record rather than creating a duplicate."""
        existing = Staff.objects.create(name='Existing Person')
        res = self.post({'username': 'existing', 'full_name': 'Existing Person',
                         'password': 'secure123', 'password2': 'secure123'})
        self.assertEqual(res.status_code, 201)
        existing.refresh_from_db()
        self.assertIsNotNone(existing.user)
        self.assertEqual(Staff.objects.filter(name='Existing Person').count(), 1)

    def test_register_does_not_link_already_linked_staff(self):
        """A Staff record with an existing user should not be re-linked."""
        other_user = User.objects.create_user(username='other', password='pass12345')
        Staff.objects.create(name='Taken Person', user=other_user)
        res = self.post({'username': 'new2', 'full_name': 'Taken Person',
                         'password': 'secure123', 'password2': 'secure123'})
        self.assertEqual(res.status_code, 201)
        self.assertEqual(Staff.objects.filter(name='Taken Person').count(), 2)

    def test_register_missing_username(self):
        res = self.post({'username': '', 'full_name': 'Test',
                         'password': 'secure123', 'password2': 'secure123'})
        self.assertEqual(res.status_code, 400)
        self.assertIn('username', res.json())

    def test_register_missing_full_name(self):
        res = self.post({'username': 'user1', 'full_name': '',
                         'password': 'secure123', 'password2': 'secure123'})
        self.assertEqual(res.status_code, 400)
        self.assertIn('full_name', res.json())

    def test_register_duplicate_username(self):
        User.objects.create_user(username='taken', password='pass12345')
        res = self.post({'username': 'taken', 'full_name': 'Someone',
                         'password': 'secure123', 'password2': 'secure123'})
        self.assertEqual(res.status_code, 400)
        self.assertIn('username', res.json())

    def test_register_password_too_short(self):
        res = self.post({'username': 'user2', 'full_name': 'User Two',
                         'password': 'short', 'password2': 'short'})
        self.assertEqual(res.status_code, 400)
        self.assertIn('password', res.json())

    def test_register_password_mismatch(self):
        res = self.post({'username': 'user3', 'full_name': 'User Three',
                         'password': 'secure123', 'password2': 'different'})
        self.assertEqual(res.status_code, 400)
        self.assertIn('password2', res.json())


class JWTTokenTest(TenantTestCase):

    def setUp(self):
        self.tc = TenantClient(self.tenant)
        self.user = User.objects.create_user(username='tokenuser', password='testpass123')
        self.staff = Staff.objects.create(name='Token User', user=self.user)

    def _payload(self, username='tokenuser', password='testpass123'):
        import jwt
        res = self.tc.post('/api/token/', {'username': username, 'password': password},
                           content_type='application/json')
        self.assertEqual(res.status_code, 200)
        return jwt.decode(res.json()['access'], options={'verify_signature': False})

    def test_token_contains_username(self):
        self.assertEqual(self._payload()['username'], 'tokenuser')

    def test_token_contains_staff_id(self):
        self.assertEqual(self._payload()['staff_id'], self.staff.id)

    def test_token_staff_id_none_when_no_staff_profile(self):
        User.objects.create_user(username='nostaff', password='testpass123')
        payload = self._payload('nostaff')
        self.assertIsNone(payload['staff_id'])

    def test_token_contains_tenant_schema(self):
        self.assertIn('tenant_schema', self._payload())
