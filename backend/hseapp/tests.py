import json
from django.contrib.auth.models import User
from django_tenants.test.cases import TenantTestCase
from django_tenants.test.client import TenantClient

from .models import (
    Staff, Attendence, Training, SafetyCard,
    InvestigationTeamMember, IncidentInvestigation,
)


# ─────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────

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


# ─────────────────────────────────────────────────────────────────
# Model Tests
# ─────────────────────────────────────────────────────────────────

class StaffModelTest(TenantTestCase):

    def test_create_staff(self):
        staff = Staff.objects.create(name='Ali Hassan', position='HSE Officer')
        self.assertEqual(staff.name, 'Ali Hassan')
        self.assertEqual(staff.position, 'HSE Officer')

    def test_staff_user_link(self):
        user = User.objects.create_user(username='ali', password='pass12345')
        staff = Staff.objects.create(name='Ali Hassan', user=user)
        self.assertEqual(staff.user, user)
        self.assertEqual(user.staff_profile, staff)

    def test_staff_without_user(self):
        """Staff can exist without a linked user account."""
        staff = Staff.objects.create(name='Unlinked Person', position='Engineer')
        self.assertIsNone(staff.user)

    def test_deleting_user_nullifies_staff_link(self):
        user = User.objects.create_user(username='bob', password='pass12345')
        staff = Staff.objects.create(name='Bob', user=user)
        user.delete()
        staff.refresh_from_db()
        self.assertIsNone(staff.user)


class AttendanceModelTest(TenantTestCase):

    def setUp(self):
        self.staff = Staff.objects.create(name='Jane Doe', position='Supervisor')

    def test_create_attendance(self):
        record = Attendence.objects.create(
            staff_name=self.staff,
            attendence_date='2026-04-17',
            attendence_status='Present',
        )
        self.assertEqual(record.attendence_status, 'Present')
        self.assertEqual(record.staff_name, self.staff)

    def test_all_status_values(self):
        for s in ('Present', 'MC', 'Absent'):
            record = Attendence.objects.create(
                staff_name=self.staff,
                attendence_date='2026-04-17',
                attendence_status=s,
            )
            self.assertEqual(record.attendence_status, s)


class TrainingModelTest(TenantTestCase):

    def test_create_training(self):
        staff = Staff.objects.create(name='Ahmad', position='Operator')
        record = Training.objects.create(
            staff_name=staff,
            training='Working at Heights',
            training_provider='NIOSH',
            training_date='2026-01-10',
            training_expiry='2027-01-10',
        )
        self.assertEqual(record.training, 'Working at Heights')
        self.assertEqual(record.training_provider, 'NIOSH')


class InvestigationTeamMemberModelTest(TenantTestCase):

    def setUp(self):
        self.staff = Staff.objects.create(name='Lead Investigator')
        self.investigation = IncidentInvestigation.objects.create(
            location_of_incident='Block A',
            what_happened='Equipment failure',
        )

    def test_add_lead_member(self):
        member = InvestigationTeamMember.objects.create(
            incidentinvestigation=self.investigation,
            staff=self.staff,
            role='Lead',
        )
        self.assertEqual(member.role, 'Lead')

    def test_more_than_four_members(self):
        """No hard limit — replaces the old 4-field approach."""
        for i in range(8):
            s = Staff.objects.create(name=f'Member {i}')
            InvestigationTeamMember.objects.create(
                incidentinvestigation=self.investigation,
                staff=s,
                role='Member',
            )
        self.assertEqual(self.investigation.team_members.count(), 8)


# ─────────────────────────────────────────────────────────────────
# Registration API Tests
# ─────────────────────────────────────────────────────────────────

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
        # A new Staff record should be created rather than hijacking the existing one
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


# ─────────────────────────────────────────────────────────────────
# JWT Token Tests
# ─────────────────────────────────────────────────────────────────

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


# ─────────────────────────────────────────────────────────────────
# Staff API Tests
# ─────────────────────────────────────────────────────────────────

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


# ─────────────────────────────────────────────────────────────────
# Attendance API Tests
# ─────────────────────────────────────────────────────────────────

class AttendanceAPITest(TenantTestCase):

    def setUp(self):
        self.user = make_user()
        self.api = auth_client(self.user, self.tenant)
        self.staff = Staff.objects.create(name='Worker One', position='Technician')

    def test_create_attendance(self):
        res = self.api.post('/hseapp/attendence/', {
            'staff_name': self.staff.id,
            'attendence_date': '2026-04-17',
            'attendence_status': 'Present',
        }, format='json')
        self.assertEqual(res.status_code, 201)

    def test_list_attendance(self):
        Attendence.objects.create(staff_name=self.staff,
                                  attendence_date='2026-04-17',
                                  attendence_status='Present')
        res = self.api.get('/hseapp/attendence/')
        self.assertEqual(res.status_code, 200)
        self.assertGreater(len(res.json()), 0)

    def test_update_attendance_status(self):
        record = Attendence.objects.create(staff_name=self.staff,
                                           attendence_date='2026-04-17',
                                           attendence_status='Present')
        res = self.api.patch(f'/hseapp/attendence/{record.id}/',
                             json.dumps({'attendence_status': 'Absent'}),
                             content_type='application/json')
        self.assertEqual(res.status_code, 200)
        record.refresh_from_db()
        self.assertEqual(record.attendence_status, 'Absent')

    def test_delete_attendance(self):
        record = Attendence.objects.create(staff_name=self.staff,
                                           attendence_date='2026-04-17',
                                           attendence_status='MC')
        res = self.api.delete(f'/hseapp/attendence/{record.id}/')
        self.assertEqual(res.status_code, 204)
        self.assertFalse(Attendence.objects.filter(id=record.id).exists())

    def test_attendance_unauthenticated(self):
        # Views use IsAuthenticatedOrReadOnly — unauthenticated reads are allowed
        res = TenantClient(self.tenant).get('/hseapp/attendence/')
        self.assertEqual(res.status_code, 200)


# ─────────────────────────────────────────────────────────────────
# Training API Tests
# ─────────────────────────────────────────────────────────────────

class TrainingAPITest(TenantTestCase):

    def setUp(self):
        self.user = make_user()
        self.api = auth_client(self.user, self.tenant)
        self.staff = Staff.objects.create(name='Trainee', position='Operator')

    def test_create_training_record(self):
        res = self.api.post('/hseapp/training/', {
            'staff_name': self.staff.id,
            'training': 'First Aid',
            'training_provider': 'Red Cross',
            'training_date': '2026-01-01',
            'training_expiry': '2027-01-01',
        }, format='json')
        self.assertEqual(res.status_code, 201)

    def test_list_training_records(self):
        Training.objects.create(staff_name=self.staff, training='HAZMAT',
                                training_provider='NIOSH')
        res = self.api.get('/hseapp/training/')
        self.assertEqual(res.status_code, 200)
        self.assertGreater(len(res.json()), 0)

    def test_delete_training_record(self):
        record = Training.objects.create(staff_name=self.staff, training='Scaffolding')
        res = self.api.delete(f'/hseapp/training/{record.id}/')
        self.assertEqual(res.status_code, 204)
        self.assertFalse(Training.objects.filter(id=record.id).exists())


# ─────────────────────────────────────────────────────────────────
# Safety Card API Tests
# ─────────────────────────────────────────────────────────────────

class SafetyCardAPITest(TenantTestCase):

    def setUp(self):
        self.user = make_user()
        self.api = auth_client(self.user, self.tenant)
        self.staff = Staff.objects.create(name='Reporter', position='HSE Officer')

    def test_create_safety_card(self):
        res = self.api.post('/hseapp/safetycard/', {
            'short_desc': 'Worker not wearing PPE',
            'raised_by': self.staff.id,
            'what_happened': '(A) Head Protection not worn',
            'status': 'Ongoing',
        }, format='json')
        self.assertEqual(res.status_code, 201)

    def test_list_safety_cards(self):
        SafetyCard.objects.create(short_desc='Test observation', raised_by=self.staff)
        res = self.api.get('/hseapp/safetycard/')
        self.assertEqual(res.status_code, 200)
        self.assertGreater(len(res.json()), 0)

    def test_update_safety_card_status(self):
        card = SafetyCard.objects.create(short_desc='Unsafe condition',
                                         raised_by=self.staff, status='Ongoing')
        res = self.api.patch(f'/hseapp/safetycard/{card.id}/',
                             json.dumps({'status': 'Resolved'}),
                             content_type='application/json')
        self.assertEqual(res.status_code, 200)
        card.refresh_from_db()
        self.assertEqual(card.status, 'Resolved')

    def test_delete_safety_card(self):
        card = SafetyCard.objects.create(short_desc='To be deleted', raised_by=self.staff)
        res = self.api.delete(f'/hseapp/safetycard/{card.id}/')
        self.assertEqual(res.status_code, 204)
        self.assertFalse(SafetyCard.objects.filter(id=card.id).exists())


# ─────────────────────────────────────────────────────────────────
# Investigation Team Member API Tests
# ─────────────────────────────────────────────────────────────────

class InvestigationTeamMemberAPITest(TenantTestCase):

    def setUp(self):
        self.user = make_user()
        self.api = auth_client(self.user, self.tenant)
        self.staff = Staff.objects.create(name='Investigator')
        self.investigation = IncidentInvestigation.objects.create(
            location_of_incident='Site B',
            what_happened='Fall from height',
        )

    def test_add_team_member(self):
        res = self.api.post('/hseapp/investigationteammember/', {
            'incidentinvestigation': self.investigation.id,
            'staff': self.staff.id,
            'role': 'Lead',
        }, format='json')
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.json()['role'], 'Lead')

    def test_list_team_members(self):
        InvestigationTeamMember.objects.create(
            incidentinvestigation=self.investigation,
            staff=self.staff, role='Member',
        )
        res = self.api.get('/hseapp/investigationteammember/')
        self.assertEqual(res.status_code, 200)
        self.assertGreater(len(res.json()), 0)

    def test_delete_team_member(self):
        member = InvestigationTeamMember.objects.create(
            incidentinvestigation=self.investigation,
            staff=self.staff, role='Member',
        )
        res = self.api.delete(f'/hseapp/investigationteammember/{member.id}/')
        self.assertEqual(res.status_code, 204)

    def test_no_limit_on_members(self):
        """Should support more than the old 4-member fixed-field limit."""
        for i in range(8):
            s = Staff.objects.create(name=f'Member {i}')
            self.api.post('/hseapp/investigationteammember/', {
                'incidentinvestigation': self.investigation.id,
                'staff': s.id,
                'role': 'Member',
            }, format='json')
        self.assertEqual(self.investigation.team_members.count(), 8)
