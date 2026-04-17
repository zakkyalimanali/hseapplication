from django.contrib.auth.models import User
from django_tenants.test.cases import TenantTestCase

from hseapp.models import Staff, Attendence, Training, InvestigationTeamMember, IncidentInvestigation


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
