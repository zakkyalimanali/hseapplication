import json
from django_tenants.test.cases import TenantTestCase
from django_tenants.test.client import TenantClient

from hseapp.models import Staff, Attendence
from .helpers import make_user, auth_client


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
