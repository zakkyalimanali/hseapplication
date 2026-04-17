from django_tenants.test.cases import TenantTestCase

from hseapp.models import Staff, Training
from .helpers import make_user, auth_client


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
