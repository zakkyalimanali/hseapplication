from django_tenants.test.cases import TenantTestCase

from hseapp.models import Staff, InvestigationTeamMember, IncidentInvestigation
from .helpers import make_user, auth_client


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
