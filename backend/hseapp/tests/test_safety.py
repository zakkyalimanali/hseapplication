import json
from django_tenants.test.cases import TenantTestCase

from hseapp.models import Staff, SafetyCard
from .helpers import make_user, auth_client


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
