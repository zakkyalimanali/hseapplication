"""
Seed demo data for Ali Company.
Run with:  python manage.py seed_ali_company
Use --clear to wipe existing records first.
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, timedelta
import random

from django_tenants.utils import schema_context

from hseapp.models import (
    Staff, Attendence, SafetyCard, Incident, IncidentInvestigation,
    IncidentFactors, ToolBoxTalk, Training, SiteVisit, SiteHazards,
    EquipmentAndItems, PermitToWork, HazardsAndPrecautions, PhysicalControls,
    JobSafetyAnalysis, JobSafetyEquipment, JobSafetySteps, JobSafetyHazards,
    RiskRegisterProject, RiskRegister, RiskManagement, RiskMitigation,
    EmergencyPlan, HseAudit, SafeWorkPractice, WorkplaceRule,
)

TODAY = date.today()
def days_ago(n): return TODAY - timedelta(days=n)
def days_from(n): return TODAY + timedelta(days=n)


class Command(BaseCommand):
    help = 'Seed demo data for Ali Company'

    def add_arguments(self, parser):
        parser.add_argument('--clear', action='store_true', help='Delete existing records before seeding')
        parser.add_argument('--schema', default='alicompany', help='Tenant schema name (default: alicompany)')

    def handle(self, *args, **options):
        schema = options['schema']
        self.stdout.write(f'Running in tenant schema: {schema}')
        with schema_context(schema):
            self._seed(options)

    def _seed(self, options):
        if options['clear']:
            self.stdout.write('Clearing existing data...')
            for model in [
                RiskMitigation, RiskManagement, RiskRegister, RiskRegisterProject,
                JobSafetyHazards, JobSafetySteps, JobSafetyEquipment, JobSafetyAnalysis,
                HazardsAndPrecautions, PhysicalControls, PermitToWork,
                SiteHazards, SiteVisit, Training, ToolBoxTalk,
                IncidentFactors, IncidentInvestigation, Incident,
                SafetyCard, Attendence, EquipmentAndItems,
                EmergencyPlan, HseAudit, SafeWorkPractice, WorkplaceRule,
                Staff,
            ]:
                model.objects.all().delete()

        self.stdout.write('Creating staff...')
        staff_data = [
            dict(name='Ali Rahman',       position='HSE Manager',        staff_id_number='EMP-001', gender='Male',   nationality='Brunei',   citizenship='Citizen', smart_card_colour='Green',  joining_date=days_ago(730), date_of_birth=date(1980, 3, 15), yearly_leave_days=21, yearly_leave_taken=5,  telephone_number=8231001, email_address='ali.rahman@alicompany.com',   passport_number='BN1001001', passport_expiry_date=days_from(365*3)),
            dict(name='Sarah Abdullah',   position='HSE Officer',         staff_id_number='EMP-002', gender='Female', nationality='Brunei',   citizenship='Citizen', smart_card_colour='Yellow', joining_date=days_ago(540), date_of_birth=date(1990, 7, 22), yearly_leave_days=18, yearly_leave_taken=3,  telephone_number=8231002, email_address='sarah.ab@alicompany.com',     passport_number='BN1001002', passport_expiry_date=days_from(365*2)),
            dict(name='Ahmad Hassan',     position='Site Supervisor',     staff_id_number='EMP-003', gender='Male',   nationality='Malaysia', citizenship='PR',      smart_card_colour='Green',  joining_date=days_ago(900), date_of_birth=date(1975, 11, 8), yearly_leave_days=21, yearly_leave_taken=10, telephone_number=8231003, email_address='ahmad.h@alicompany.com',      passport_number='MY2001003', passport_expiry_date=days_from(365*4)),
            dict(name='Wati Aziz',        position='Safety Officer',      staff_id_number='EMP-004', gender='Female', nationality='Brunei',   citizenship='Citizen', smart_card_colour='Yellow', joining_date=days_ago(400), date_of_birth=date(1993, 5, 30), yearly_leave_days=18, yearly_leave_taken=2,  telephone_number=8231004, email_address='wati.aziz@alicompany.com',    passport_number='BN1001004', passport_expiry_date=days_from(365*2)),
            dict(name='James Wilson',     position='Project Manager',     staff_id_number='EMP-005', gender='Male',   nationality='UK',       citizenship='Other',   smart_card_colour='Green',  joining_date=days_ago(600), date_of_birth=date(1978, 9, 12), yearly_leave_days=25, yearly_leave_taken=8,  telephone_number=8231005, email_address='james.w@alicompany.com',      passport_number='UK3001005', passport_expiry_date=days_from(365*5)),
            dict(name='Roslan Omar',      position='Foreman',             staff_id_number='EMP-006', gender='Male',   nationality='Malaysia', citizenship='PR',      smart_card_colour='Yellow', joining_date=days_ago(700), date_of_birth=date(1982, 2, 18), yearly_leave_days=18, yearly_leave_taken=6,  telephone_number=8231006, email_address='roslan.o@alicompany.com',     passport_number='MY2001006', passport_expiry_date=days_from(365*3)),
            dict(name='Kevin Tan',        position='Crane Operator',      staff_id_number='EMP-007', gender='Male',   nationality='Malaysia', citizenship='Other',   smart_card_colour='Red',    joining_date=days_ago(90),  date_of_birth=date(1995, 6, 25), yearly_leave_days=14, yearly_leave_taken=1,  telephone_number=8231007, email_address='kevin.t@alicompany.com',      passport_number='MY2001007', passport_expiry_date=days_from(365*1)),
            dict(name='Fatimah Ali',      position='Admin Officer',       staff_id_number='EMP-008', gender='Female', nationality='Brunei',   citizenship='Citizen', smart_card_colour='Green',  joining_date=days_ago(1100),date_of_birth=date(1985, 4, 10), yearly_leave_days=21, yearly_leave_taken=14, telephone_number=8231008, email_address='fatimah.a@alicompany.com',    passport_number='BN1001008', passport_expiry_date=days_from(365*2)),
            dict(name='David Brooks',     position='Mechanical Engineer', staff_id_number='EMP-009', gender='Male',   nationality='Australia',citizenship='Other',   smart_card_colour='Green',  joining_date=days_ago(450), date_of_birth=date(1983, 8, 5),  yearly_leave_days=25, yearly_leave_taken=7,  telephone_number=8231009, email_address='david.b@alicompany.com',      passport_number='AU4001009', passport_expiry_date=days_from(365*6)),
            dict(name='Nurul Hana',       position='HSE Trainee',         staff_id_number='EMP-010', gender='Female', nationality='Brunei',   citizenship='Citizen', smart_card_colour='Red',    joining_date=days_ago(60),  date_of_birth=date(1999, 1, 14), yearly_leave_days=14, yearly_leave_taken=0,  telephone_number=8231010, email_address='nurul.h@alicompany.com',      passport_number='BN1001010', passport_expiry_date=days_from(365*4)),
        ]
        staffs = []
        for d in staff_data:
            s, _ = Staff.objects.get_or_create(name=d['name'], defaults=d)
            staffs.append(s)
        self.stdout.write(f'  {len(staffs)} staff created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating attendance...')
        statuses = ['Present', 'Present', 'Present', 'Present', 'MC', 'Absent']
        att_count = 0
        for i in range(14):
            att_date = days_ago(i)
            if att_date.weekday() < 5:  # weekdays only
                for staff in staffs:
                    Attendence.objects.get_or_create(
                        staff_name=staff, attendence_date=att_date,
                        defaults={'attendence_status': random.choice(statuses)}
                    )
                    att_count += 1
        self.stdout.write(f'  {att_count} attendance records created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating equipment...')
        equip_data = [
            dict(equipment_item='Hard Hat',          type_of_equipment_item='PPE',       category='Head Protection',  identification_code='EQ-001', size='Universal', quantity_in_item=25, dollar_value=15,  condition='Good',  storage_location='PPE Store Room A'),
            dict(equipment_item='Safety Harness',    type_of_equipment_item='PPE',       category='Fall Protection',  identification_code='EQ-002', size='Large',     quantity_in_item=10, dollar_value=120, condition='Good',  storage_location='PPE Store Room A'),
            dict(equipment_item='Fire Extinguisher', type_of_equipment_item='Equipment', category='Fire Safety',      identification_code='EQ-003', size='9kg',       quantity_in_item=8,  dollar_value=80,  condition='Good',  storage_location='Site Office'),
            dict(equipment_item='Safety Goggles',    type_of_equipment_item='PPE',       category='Eye Protection',   identification_code='EQ-004', size='Universal', quantity_in_item=30, dollar_value=12,  condition='Fair',  storage_location='PPE Store Room A'),
            dict(equipment_item='Gas Detector',      type_of_equipment_item='Equipment', category='Detection',        identification_code='EQ-005', size='Handheld',  quantity_in_item=4,  dollar_value=350, condition='Good',  storage_location='HSE Office'),
            dict(equipment_item='First Aid Kit',     type_of_equipment_item='Medical',   category='Medical',          identification_code='EQ-006', size='Large',     quantity_in_item=5,  dollar_value=60,  condition='Good',  storage_location='Site Office'),
            dict(equipment_item='Ear Muffs',         type_of_equipment_item='PPE',       category='Hearing Protection',identification_code='EQ-007', size='Universal', quantity_in_item=20, dollar_value=18,  condition='Good',  storage_location='PPE Store Room A'),
            dict(equipment_item='Safety Boots',      type_of_equipment_item='PPE',       category='Foot Protection',  identification_code='EQ-008', size='Various',   quantity_in_item=15, dollar_value=90,  condition='Good',  storage_location='PPE Store Room B'),
            dict(equipment_item='Caution Tape',      type_of_equipment_item='Equipment', category='Barricading',      identification_code='EQ-009', size='100m roll', quantity_in_item=20, dollar_value=8,   condition='Good',  storage_location='Store Room B'),
            dict(equipment_item='Stretcher',         type_of_equipment_item='Medical',   category='Medical',          identification_code='EQ-010', size='Standard',  quantity_in_item=2,  dollar_value=200, condition='Good',  storage_location='Site Office'),
        ]
        for d in equip_data:
            EquipmentAndItems.objects.get_or_create(identification_code=d['identification_code'], defaults=d)
        self.stdout.write(f'  {len(equip_data)} equipment items created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating safety cards...')
        what_options = [
            '(A) Head Protection not worn',
            '(A) Head Protection not worn',
            '(G) Hand protection not worn',
            '(E) Protective clothing not worn',
            '(AA) In danger of fall/slip/trip',
            '(AA) In danger of fall/slip/trip',
            '(BB) In danger of electrocution',
            '(K) PPE not worn properly',
            '(N) Wrong tool for the job',
            '(OO) Procedures / Standard not followed',
            '(SS) Toolbox talk not given',
            '(TT) Driving recklessly',
            '(X) In danger of struck',
            '(B) Eye protection not worn',
            '(MM) Work without permission',
        ]
        why_options = [
            '(1) Not Informed',
            '(1) Not Informed',
            '(8) Behavior & Attitude (intentionally)',
            '(9) Negligence',
            '(9) Negligence',
            '(14) Lack of skill',
            '(7) Lack of HSE Coaching / training',
            '(7) Lack of HSE Coaching / training',
            '(13) Work habits',
            '(15) Time pressure',
            '(20) Behavior & Attitude (not intentionally)',
        ]
        lsr_options = [
            '(6) Protect yourself against a fall when working at height',
            '(6) Protect yourself against a fall when working at height',
            '(1) Work with a valid work permit when required',
            '(7) Do not walk under a suspended load',
            '(11) Wear your seat belts',
            '(10) While driving , do not use your phone and do not exceed limit',
            '(3) Verify isolation before work begins and use the specific life protecting equipment',
            '',
            '',
        ]
        status_options = ['Resolved', 'Resolved', 'Ongoing', 'No Further Action Required']
        locations = ['Block A - Level 2', 'Workshop Area', 'Main Gate', 'Warehouse', 'Site Perimeter', 'Roof Level', 'Loading Bay']

        sc_entries = [
            dict(short_desc='Hard hat not worn near scaffolding', raised_by=staffs[1], what_happened='(A) Head Protection not worn', why_happened='(8) Behavior & Attitude (intentionally)', life_saving_rule='', location='Block A - Level 2', findings='Worker observed without hard hat', status='Resolved', date_raised=days_ago(30), incident_date=days_ago(30), target_date=days_ago(25), follow_up='Yes', follow_up_remarks='Counselled and re-issued PPE'),
            dict(short_desc='No safety goggles during grinding', raised_by=staffs[0], what_happened='(B) Eye protection not worn', why_happened='(1) Not Informed', life_saving_rule='', location='Workshop Area', findings='New worker unaware of requirement', status='Resolved', date_raised=days_ago(25), incident_date=days_ago(25), target_date=days_ago(20), follow_up='Yes', follow_up_remarks='Induction updated'),
            dict(short_desc='Fall risk - unsecured ladder', raised_by=staffs[1], what_happened='(AA) In danger of fall/slip/trip', why_happened='(13) Work habits', life_saving_rule='(6) Protect yourself against a fall when working at height', location='Roof Level', findings='Ladder not secured at top', status='Ongoing', date_raised=days_ago(20), incident_date=days_ago(20), target_date=days_ago(10), follow_up='Yes', follow_up_remarks='Ladder inspection protocol being developed'),
            dict(short_desc='Working at height without harness', raised_by=staffs[3], what_happened='(AA) In danger of fall/slip/trip', why_happened='(9) Negligence', life_saving_rule='(6) Protect yourself against a fall when working at height', location='Scaffolding Zone B', findings='Harness available but not worn', status='Resolved', date_raised=days_ago(18), incident_date=days_ago(18), target_date=days_ago(14), follow_up='Yes', follow_up_remarks='Written warning issued'),
            dict(short_desc='Wrong PPE for chemical handling', raised_by=staffs[0], what_happened='(E) Protective clothing not worn', why_happened='(7) Lack of HSE Coaching / training', life_saving_rule='', location='Chemical Storage', findings='Worker used standard gloves not chemical-resistant', status='Ongoing', date_raised=days_ago(15), incident_date=days_ago(15), target_date=days_ago(5), follow_up='No', follow_up_remarks=''),
            dict(short_desc='No gloves while handling sharp materials', raised_by=staffs[3], what_happened='(G) Hand protection not worn', why_happened='(9) Negligence', life_saving_rule='', location='Loading Bay', findings='Minor laceration risk observed', status='No Further Action Required', date_raised=days_ago(14), incident_date=days_ago(14), target_date=days_ago(10), follow_up='No', follow_up_remarks='Toolbox talk issued'),
            dict(short_desc='Driving forklift too fast in yard', raised_by=staffs[2], what_happened='(TT) Driving recklessly', why_happened='(15) Time pressure', life_saving_rule='(10) While driving , do not use your phone and do not exceed limit', location='Main Yard', findings='Forklift exceeded 10kph speed limit', status='Resolved', date_raised=days_ago(12), incident_date=days_ago(12), target_date=days_ago(8), follow_up='Yes', follow_up_remarks='Speed limit signs re-posted, briefing done'),
            dict(short_desc='Work started without valid permit', raised_by=staffs[0], what_happened='(MM) Work without permission', why_happened='(1) Not Informed', life_saving_rule='(1) Work with a valid work permit when required', location='Electrical Room', findings='Subcontractor started work before permit issued', status='Ongoing', date_raised=days_ago(10), incident_date=days_ago(10), target_date=days_ago(3), follow_up='Yes', follow_up_remarks='Subcontractor briefed on permit process'),
            dict(short_desc='Ear protection not worn near generator', raised_by=staffs[1], what_happened='(A) Head Protection not worn', why_happened='(20) Behavior & Attitude (not intentionally)', life_saving_rule='', location='Generator Room', findings='Noise level exceeded 85dB threshold', status='No Further Action Required', date_raised=days_ago(8), incident_date=days_ago(8), target_date=days_ago(4), follow_up='No', follow_up_remarks='PPE reminder posted'),
            dict(short_desc='Suspended load movement with personnel below', raised_by=staffs[2], what_happened='(X) In danger of struck', why_happened='(1) Not Informed', life_saving_rule='(7) Do not walk under a suspended load', location='Crane Zone', findings='Exclusion zone not properly barricaded', status='Ongoing', date_raised=days_ago(6), incident_date=days_ago(6), target_date=TODAY, follow_up='Yes', follow_up_remarks='Crane zone barricading reviewed'),
            dict(short_desc='Procedures not followed for hot work', raised_by=staffs[0], what_happened='(OO) Procedures / Standard not followed', why_happened='(7) Lack of HSE Coaching / training', life_saving_rule='(1) Work with a valid work permit when required', location='Fabrication Area', findings='Welder skipped pre-work checklist', status='Ongoing', date_raised=days_ago(5), incident_date=days_ago(5), target_date=days_from(5), follow_up='No', follow_up_remarks=''),
            dict(short_desc='Toolbox talk not conducted before shift', raised_by=staffs[3], what_happened='(SS) Toolbox talk not given', why_happened='(14) Lack of skill', life_saving_rule='', location='Site Office', findings='Supervisor absent, no delegation', status='Resolved', date_raised=days_ago(4), incident_date=days_ago(4), target_date=days_ago(2), follow_up='Yes', follow_up_remarks='Delegation procedure updated'),
            dict(short_desc='Wrong tool used for pipe fitting', raised_by=staffs[5], what_happened='(N) Wrong tool for the job', why_happened='(9) Negligence', life_saving_rule='', location='Pipe Yard', findings='Adjustable spanner used instead of correct size', status='No Further Action Required', date_raised=days_ago(3), incident_date=days_ago(3), target_date=days_ago(1), follow_up='No', follow_up_remarks='Toolbox contents reviewed'),
            dict(short_desc='Electrocution risk - exposed wiring', raised_by=staffs[0], what_happened='(BB) In danger of electrocution', why_happened='(13) Work habits', life_saving_rule='(3) Verify isolation before work begins and use the specific life protecting equipment', location='Electrical Panel B', findings='Temporary wiring left exposed overnight', status='Resolved', date_raised=days_ago(2), incident_date=days_ago(2), target_date=TODAY, follow_up='Yes', follow_up_remarks='Isolation and lock-out procedure re-enforced'),
            dict(short_desc='PPE not worn correctly - chin strap loose', raised_by=staffs[3], what_happened='(K) PPE not worn properly', why_happened='(20) Behavior & Attitude (not intentionally)', life_saving_rule='', location='Block A', findings='Hard hat chin strap not fastened', status='No Further Action Required', date_raised=days_ago(1), incident_date=days_ago(1), target_date=days_from(2), follow_up='No', follow_up_remarks='Verbal reminder given'),
        ]
        for d in sc_entries:
            SafetyCard.objects.get_or_create(short_desc=d['short_desc'], defaults=d)
        self.stdout.write(f'  {len(sc_entries)} safety cards created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating incidents...')
        incident_data = [
            dict(short_desc='Slip on wet floor - Workshop',  what_happened='(AA) In danger of fall/slip/trip', why_happened='(10) Working condition', life_saving_rule='', findings='Worker slipped on oil spill near lathe machine', location='Workshop', status='Resolved', date_raised=days_ago(60), incident_date=days_ago(60), target_date=days_ago(50), follow_up='Yes', follow_up_remarks='Absorbent mats installed', raised_by=staffs[2]),
            dict(short_desc='Minor burn during welding',      what_happened='(CC) In danger of burnt',          why_happened='(14) Lack of skill',        life_saving_rule='', findings='Welder touched hot metal without gloves', location='Fabrication Area', status='Resolved', date_raised=days_ago(45), incident_date=days_ago(45), target_date=days_ago(35), follow_up='Yes', follow_up_remarks='Refresher training conducted', raised_by=staffs[0]),
            dict(short_desc='Near miss - falling object',     what_happened='(X) In danger of struck',          why_happened='(9) Negligence',             life_saving_rule='(7) Do not walk under a suspended load', findings='Unsecured tool fell from scaffold level 3', location='Scaffolding Zone A', status='No Further Action Required', date_raised=days_ago(30), incident_date=days_ago(30), target_date=days_ago(22), follow_up='Yes', follow_up_remarks='Tool tethering policy enforced', raised_by=staffs[1]),
            dict(short_desc='Hand injury during manual lifting', what_happened='(G) Hand protection not worn',   why_happened='(13) Work habits',           life_saving_rule='', findings='Worker cut palm on sharp metal edge', location='Store Room B', status='Ongoing', date_raised=days_ago(14), incident_date=days_ago(14), target_date=days_from(7), follow_up='No', follow_up_remarks='', raised_by=staffs[3]),
            dict(short_desc='Vehicle near miss at site gate',  what_happened='(TT) Driving recklessly',          why_happened='(15) Time pressure',         life_saving_rule='(11) Wear your seat belts', findings='Delivery truck did not stop at gate checkpoint', location='Main Gate', status='Ongoing', date_raised=days_ago(7), incident_date=days_ago(7), target_date=days_from(14), follow_up='Yes', follow_up_remarks='Traffic management plan under revision', raised_by=staffs[0]),
        ]
        for d in incident_data:
            Incident.objects.get_or_create(short_desc=d['short_desc'], defaults=d)
        self.stdout.write(f'  {len(incident_data)} incidents created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating permit to work...')
        ptw_data = [
            dict(permit_number='PTW-2024-001', location_of_work='Electrical Room B', nature_of_work='Replacement of electrical panel breakers', work_start=days_ago(20), work_start_time='07:00:00', work_completed=days_ago(19)),
            dict(permit_number='PTW-2024-002', location_of_work='Roof Level - Zone A', nature_of_work='Installation of rooftop HVAC units', work_start=days_ago(14), work_start_time='08:00:00', work_completed=days_ago(12)),
            dict(permit_number='PTW-2024-003', location_of_work='Confined Space - Tank T-01', nature_of_work='Internal inspection and cleaning of storage tank', work_start=days_ago(10), work_start_time='07:30:00', work_completed=days_ago(10)),
            dict(permit_number='PTW-2024-004', location_of_work='Fabrication Area', nature_of_work='Hot work - welding of pipe supports', work_start=days_ago(5), work_start_time='08:00:00', work_completed=None),
            dict(permit_number='PTW-2024-005', location_of_work='Main Yard - Crane Zone', nature_of_work='Crane lift of structural steel sections', work_start=TODAY, work_start_time='07:00:00', work_completed=None),
        ]
        ptws = []
        for d in ptw_data:
            p, _ = PermitToWork.objects.get_or_create(permit_number=d['permit_number'], defaults=d)
            ptws.append(p)

        hazards_per_ptw = [
            [('Electrical shock', 'Isolate and lock out before work begins'), ('Arc flash', 'Use arc-rated PPE')],
            [('Fall from height', 'Use approved scaffolding and safety harness'), ('Dropped tools', 'Use tool lanyards')],
            [('Oxygen deficiency', 'Continuous atmospheric monitoring required'), ('Entrapment', 'Standby person and rescue kit on site')],
            [('Fire from hot work', 'Fire watch and extinguisher on standby'), ('Burns', 'Full welding PPE required')],
            [('Struck by load', 'Exclusion zone to be barricaded'), ('Structural collapse', 'Engineer sign-off on lift plan')],
        ]
        controls_per_ptw = [
            [('Lock Out Tag Out (LOTO)', 'Prevents accidental re-energisation')],
            [('Safety net below work area', 'Catches dropped items and prevents injury')],
            [('Continuous gas monitoring', 'Detects any toxic or flammable atmosphere changes'), ('Tripod and retrieval system', 'Allows rescue from outside the space')],
            [('Fire blanket around work area', 'Contains sparks and reduces fire spread risk')],
            [('Crane pre-use inspection completed', 'Ensures crane is safe to operate')],
        ]
        for i, ptw in enumerate(ptws):
            for h, p in hazards_per_ptw[i]:
                HazardsAndPrecautions.objects.get_or_create(permit_to_work=ptw, hazards=h, defaults={'precautions': p})
            for c, h in controls_per_ptw[i]:
                PhysicalControls.objects.get_or_create(permit_to_work=ptw, control_mechanisms=c, defaults={'control_how_will_it_help': h})
        self.stdout.write(f'  {len(ptws)} permits to work created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating job safety analyses...')
        jsa_data = [
            dict(job_title='Scaffolding Erection', jsa_id='JSA-001', job_performer=staffs[5], supervisor=staffs[2], analysis_by=staffs[0], reviewed_by=staffs[0], company='Ali Company', location='Block A', department='Construction', date_raised=days_ago(30)),
            dict(job_title='Electrical Panel Maintenance', jsa_id='JSA-002', job_performer=staffs[8], supervisor=staffs[4], analysis_by=staffs[0], reviewed_by=staffs[1], company='Ali Company', location='Electrical Room', department='Maintenance', date_raised=days_ago(25)),
            dict(job_title='Confined Space Entry - Tank Cleaning', jsa_id='JSA-003', job_performer=staffs[5], supervisor=staffs[2], analysis_by=staffs[3], reviewed_by=staffs[0], company='Ali Company', location='Tank Farm', department='Operations', date_raised=days_ago(12)),
            dict(job_title='Hot Work - Pipe Welding', jsa_id='JSA-004', job_performer=staffs[5], supervisor=staffs[2], analysis_by=staffs[1], reviewed_by=staffs[0], company='Ali Company', location='Fabrication Yard', department='Construction', date_raised=days_ago(6)),
            dict(job_title='Working at Height - Rooftop Installation', jsa_id='JSA-005', job_performer=staffs[6], supervisor=staffs[4], analysis_by=staffs[3], reviewed_by=staffs[0], company='Ali Company', location='Roof Level', department='Construction', date_raised=days_ago(2)),
        ]
        jsas = []
        for d in jsa_data:
            j, _ = JobSafetyAnalysis.objects.get_or_create(jsa_id=d['jsa_id'], defaults=d)
            jsas.append(j)

        jsa_equipment = [
            ['Hard Hat', 'Safety Harness', 'Safety Boots', 'High-Vis Vest'],
            ['Arc-rated gloves', 'Safety goggles', 'Insulated tools', 'Voltage tester'],
            ['Self-contained breathing apparatus (SCBA)', 'Gas detector', 'Safety harness', 'Tripod & retrieval system'],
            ['Welding shield', 'Fire-retardant PPE', 'Welding gloves', 'Fire extinguisher'],
            ['Full body harness', 'Safety lanyard', 'Hard hat', 'Safety boots'],
        ]
        jsa_steps = [
            ['Inspect scaffold materials and components', 'Erect base plates and sole boards', 'Assemble standards and ledgers', 'Install working platforms and toe boards', 'Attach safety nets'],
            ['Isolate power supply with LOTO', 'Verify isolation with voltage tester', 'Inspect existing wiring and connections', 'Replace faulty components', 'Test system before restoring power'],
            ['Atmospheric test prior to entry', 'Set up tripod and retrieval system', 'Enter with SCBA and radio communication', 'Complete inspection and cleaning', 'Exit and report findings'],
            ['Set up fire watch and extinguisher', 'Inspect welding equipment', 'Mark and prepare weld area', 'Perform welding with full PPE', 'Post-weld inspection and cool-down'],
            ['Inspect all fall protection equipment', 'Secure anchor points', 'Brief all workers on fall rescue plan', 'Commence work with continuous supervision', 'Inspect work area at end of shift'],
        ]
        jsa_hazards = [
            [('Falling scaffold components', 'Barricade below, use tool lanyards'), ('Fall from height', 'Maintain 3-point contact at all times')],
            [('Electrical shock', 'Full LOTO procedure required'), ('Arc flash', 'Maintain safe distance, use arc PPE')],
            [('Toxic atmosphere', 'Continuous monitoring, SCBA worn inside'), ('Entrapment', 'Never leave confined space unattended')],
            [('Fire ignition', 'Remove combustibles within 10m of work area'), ('Burns', 'Full welding PPE at all times')],
            [('Fall from height', 'Double lanyard system when near edge'), ('Dropped objects', 'Tool lanyards and exclusion zone below')],
        ]
        for i, jsa in enumerate(jsas):
            for eq in jsa_equipment[i]:
                JobSafetyEquipment.objects.get_or_create(job_safety_analysis=jsa, safety_equipment=eq)
            for step in jsa_steps[i]:
                JobSafetySteps.objects.get_or_create(job_safety_analysis=jsa, job_steps=step)
            for hazard, control in jsa_hazards[i]:
                JobSafetyHazards.objects.get_or_create(job_safety_analysis=jsa, hazards=hazard, defaults={'controls': control})
        self.stdout.write(f'  {len(jsas)} JSAs created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating training records...')
        training_data = [
            dict(staff_name=staffs[0], training='NEBOSH International General Certificate', training_provider='NEBOSH', training_date=days_ago(400), training_expiry=days_from(365*3)),
            dict(staff_name=staffs[0], training='First Aid Level 3', training_provider='Red Crescent', training_date=days_ago(200), training_expiry=days_from(365*1)),
            dict(staff_name=staffs[1], training='IOSH Managing Safely', training_provider='IOSH', training_date=days_ago(300), training_expiry=days_from(365*2)),
            dict(staff_name=staffs[1], training='Fire Warden Training', training_provider='BOMBA', training_date=days_ago(180), training_expiry=days_from(365*2)),
            dict(staff_name=staffs[2], training='Scaffold Supervisor Certificate', training_provider='CISRS', training_date=days_ago(500), training_expiry=days_from(365*2)),
            dict(staff_name=staffs[3], training='Confined Space Entry & Rescue', training_provider='Ali Company HSE', training_date=days_ago(90), training_expiry=days_from(365*2)),
            dict(staff_name=staffs[4], training='PRINCE2 Project Management', training_provider='Axelos', training_date=days_ago(600), training_expiry=days_from(365*3)),
            dict(staff_name=staffs[6], training='Crane Operator Licence', training_provider='JKJAV', training_date=days_ago(200), training_expiry=days_from(365*4)),
            dict(staff_name=staffs[8], training='Electrical Installation Certificate', training_provider='CITP', training_date=days_ago(350), training_expiry=days_from(365*3)),
            dict(staff_name=staffs[9], training='HSE Induction Course', training_provider='Ali Company HSE', training_date=days_ago(60), training_expiry=days_from(365)),
        ]
        for d in training_data:
            Training.objects.get_or_create(staff_name=d['staff_name'], training=d['training'], defaults=d)
        self.stdout.write(f'  {len(training_data)} training records created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating toolbox talks...')
        tbt_data = [
            dict(toolbox_date=days_ago(14), topic='Working at Height — Fall Prevention', presenter=staffs[0], supervisor=staffs[2], project='Ali Company Site', crew_number=12, attendees=11, address='Site Office Meeting Room', employer='Ali Company', shift='Morning', textbox='Reviewed fall protection requirements, correct use of safety harness, and inspection procedures for lanyards and anchor points.'),
            dict(toolbox_date=days_ago(10), topic='Permit to Work Awareness', presenter=staffs[1], supervisor=staffs[4], project='Ali Company Site', crew_number=15, attendees=14, address='Site Office Meeting Room', employer='Ali Company', shift='Morning', textbox='Explained the permit to work process, types of permits, responsibilities of permit holder and issuer.'),
            dict(toolbox_date=days_ago(7),  topic='Housekeeping & Slip/Trip Prevention', presenter=staffs[3], supervisor=staffs[2], project='Ali Company Site', crew_number=12, attendees=12, address='Main Yard', employer='Ali Company', shift='Morning', textbox='Walked through common housekeeping failures, responsibility for work area cleanliness, and proper storage of materials.'),
            dict(toolbox_date=days_ago(3),  topic='Hot Work Safety — Welding & Cutting', presenter=staffs[0], supervisor=staffs[4], project='Ali Company Site', crew_number=8,  attendees=8,  address='Fabrication Area', employer='Ali Company', shift='Morning', textbox='Reviewed hot work permit requirements, fire watch duties, fire extinguisher locations, and PPE for hot work activities.'),
            dict(toolbox_date=days_ago(1),  topic='Manual Handling Techniques', presenter=staffs[3], supervisor=staffs[2], project='Ali Company Site', crew_number=10, attendees=9,  address='Site Office Meeting Room', employer='Ali Company', shift='Morning', textbox='Demonstrated correct lifting techniques, team lifting procedures, and use of mechanical aids to reduce injury risk.'),
        ]
        for d in tbt_data:
            ToolBoxTalk.objects.get_or_create(toolbox_date=d['toolbox_date'], topic=d['topic'], defaults=d)
        self.stdout.write(f'  {len(tbt_data)} toolbox talks created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating site visits...')
        sv_data = [
            dict(inspector=staffs[0], inspection_date=days_ago(21), inspection_time='09:00:00', location='Block A - All Levels'),
            dict(inspector=staffs[1], inspection_date=days_ago(14), inspection_time='10:30:00', location='Workshop and Fabrication Yard'),
            dict(inspector=staffs[3], inspection_date=days_ago(7),  inspection_time='08:00:00', location='Tank Farm and Chemical Store'),
            dict(inspector=staffs[0], inspection_date=days_ago(1),  inspection_time='09:00:00', location='Full Site Inspection'),
        ]
        sv_hazards = [
            [('Missing toe boards on scaffold level 2', 'Open', 'Install toe boards before next shift'), ('Inadequate lighting in stairwell B', 'Open', 'Temporary lighting installed pending permanent fix')],
            [('Oil spill near lathe machine', 'Closed', 'Cleaned and absorbent mats placed'), ('Improper storage of gas cylinders', 'Open', 'Cylinders to be chained and stored in designated area')],
            [('Bund wall damaged near Tank T-02', 'Open', 'Civil team to repair bund within 7 days'), ('SDS sheets not posted at chemical store', 'Closed', 'SDS posted and laminated')],
            [('General housekeeping satisfactory', 'Closed', 'No major issues found'), ('Emergency exit sign faded - Building C', 'Open', 'New sign on order')],
        ]
        for i, d in enumerate(sv_data):
            sv, _ = SiteVisit.objects.get_or_create(inspector=d['inspector'], inspection_date=d['inspection_date'], defaults=d)
            for hazard, status, notes in sv_hazards[i]:
                SiteHazards.objects.get_or_create(visit=sv, hazard=hazard, defaults={'status': status, 'notes': notes})
        self.stdout.write(f'  {len(sv_data)} site visits created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating risk register projects...')
        rrp_data = [
            dict(project_name='Ali Company Main Construction Project 2024', raised_by=staffs[0], reviewed_by=staffs[4]),
            dict(project_name='Tank Farm Expansion Phase 2', raised_by=staffs[1], reviewed_by=staffs[4]),
        ]
        rrps = []
        for d in rrp_data:
            r, _ = RiskRegisterProject.objects.get_or_create(project_name=d['project_name'], defaults=d)
            rrps.append(r)

        rr_data = [
            dict(project_name=rrps[0], raised_by=staffs[0], reviewed_by=staffs[4], risk_description='Scaffold collapse during erection', likelihood_of_risk='3', impact_of_risk='High', severity='High', responsible_party='Site Supervisor', mitigating_action='Scaffold inspection before use, certified scaffolders only', contingency_action='Emergency rescue plan in place', progress_on_actions='Inspection checklist implemented', status='Open'),
            dict(project_name=rrps[0], raised_by=staffs[1], reviewed_by=staffs[0], risk_description='Electrical hazard during panel maintenance', likelihood_of_risk='2', impact_of_risk='High', severity='High', responsible_party='Electrical Engineer', mitigating_action='Full LOTO procedure, arc-rated PPE', contingency_action='First aid trained personnel on standby', progress_on_actions='LOTO station installed', status='Open'),
            dict(project_name=rrps[1], raised_by=staffs[0], reviewed_by=staffs[4], risk_description='Chemical spill during tank cleaning', likelihood_of_risk='3', impact_of_risk='Medium', severity='Medium', responsible_party='HSE Officer', mitigating_action='Spill kits on standby, bund walls in good condition', contingency_action='Emergency spill response plan', progress_on_actions='Bund wall repaired', status='Closed'),
        ]
        for d in rr_data:
            RiskRegister.objects.get_or_create(risk_description=d['risk_description'], project_name=d['project_name'], defaults=d)
        self.stdout.write(f'  {len(rrps)} risk register projects, {len(rr_data)} risks created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating risk management entries...')
        rm_data = [
            dict(title='Fall from Scaffolding', category='Physical', hazard_description='Workers operating at height on scaffold structures without adequate fall protection systems.', likelihood='3', consequence='4', existing_controls='Safety harness required, scaffold inspection daily', additional_controls='Install debris nets at all levels, increase supervision', responsible_person='Ahmad Hassan', target_date=days_from(14), status='Open'),
            dict(title='Electrical Shock During Maintenance', category='Physical', hazard_description='Contact with live electrical components during panel maintenance activities.', likelihood='2', consequence='5', existing_controls='LOTO procedure in place, arc-rated PPE available', additional_controls='Install permanent LOTO stations at each panel', responsible_person='David Brooks', target_date=days_from(30), status='In Progress'),
            dict(title='Chemical Exposure — Solvent Use', category='Chemical', hazard_description='Skin and inhalation exposure to organic solvents used in surface preparation.', likelihood='3', consequence='3', existing_controls='Chemical-resistant gloves and respirators issued', additional_controls='Improve ventilation in solvent storage and use areas', responsible_person='Sarah Abdullah', target_date=days_from(7), status='In Progress'),
            dict(title='Manual Handling Injury', category='Ergonomic', hazard_description='Musculoskeletal injury from repetitive lifting and carrying of heavy materials.', likelihood='4', consequence='2', existing_controls='Manual handling training completed', additional_controls='Procure additional mechanical lifting aids', responsible_person='Wati Aziz', target_date=days_from(21), status='Open'),
            dict(title='Noise-Induced Hearing Loss', category='Physical', hazard_description='Prolonged exposure to high noise levels from generators, compressors and power tools.', likelihood='3', consequence='3', existing_controls='Hearing protection available and mandatory in designated zones', additional_controls='Conduct noise mapping survey, install acoustic barriers', responsible_person='Ali Rahman', target_date=days_from(60), status='Open'),
        ]
        for d in rm_data:
            RiskManagement.objects.get_or_create(title=d['title'], defaults=d)
        self.stdout.write(f'  {len(rm_data)} risk management entries created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating risk mitigations...')
        rmit_data = [
            dict(risk_title='Install permanent fall arrest anchor points', mitigation_action='Engage structural engineer to design and install permanent anchor points on roof and scaffold structure.', priority='High', responsible_person='James Wilson', target_date=days_from(21), status='In Progress', notes='Engineer survey completed, installation scheduled.'),
            dict(risk_title='LOTO station installation', mitigation_action='Install dedicated Lock Out Tag Out stations at all main electrical panels throughout the site.', priority='Critical', responsible_person='David Brooks', target_date=days_from(14), status='Open', notes='Equipment ordered, awaiting delivery.'),
            dict(risk_title='Ventilation upgrade — Solvent Store', mitigation_action='Install mechanical ventilation system in solvent storage and use areas to reduce airborne solvent concentration.', priority='Medium', responsible_person='Ahmad Hassan', target_date=days_from(30), status='Open', notes='Quotation requested from contractor.'),
            dict(risk_title='Procure pallet jack and trolleys', mitigation_action='Purchase 2 additional pallet jacks and 4 flatbed trolleys to reduce manual handling frequency.', priority='Medium', responsible_person='Fatimah Ali', target_date=days_from(10), status='Completed', notes='Items received and deployed to loading bay.', completion_date=days_ago(2)),
        ]
        for d in rmit_data:
            RiskMitigation.objects.get_or_create(risk_title=d['risk_title'], defaults=d)
        self.stdout.write(f'  {len(rmit_data)} risk mitigations created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating emergency plans...')
        ep_data = [
            dict(title='Fire Emergency Response Plan', plan_type='Fire', location='Ali Company Main Site', responsible_person='Ali Rahman', description='Comprehensive fire emergency response plan covering detection, evacuation, and fire fighting procedures for the main site.', procedures='1. Activate fire alarm\n2. Call 995 immediately\n3. Evacuate all personnel via nearest exit\n4. Assemble at Muster Point A (Main Car Park)\n5. Account for all personnel\n6. Do not re-enter until declared safe by Fire Warden', assembly_point='Muster Point A — Main Car Park', emergency_contacts='Fire Brigade: 995\nSite Manager: +673 8231004\nHSE Manager: +673 8231001', last_reviewed=days_ago(30), status='Active'),
            dict(title='Medical Emergency Response Plan', plan_type='Medical', location='Ali Company Main Site', responsible_person='Sarah Abdullah', description='Procedures for responding to medical emergencies including injuries, illness, and chemical exposure incidents on site.', procedures='1. Ensure scene is safe\n2. Call 991 for ambulance\n3. Administer first aid if trained\n4. Do not move injured person unless in immediate danger\n5. Meet ambulance at main gate\n6. Complete incident report within 24 hours', assembly_point='Site Office (First Aid Room)', emergency_contacts='Ambulance: 991\nFirst Aider: +673 8231002\nHSE Manager: +673 8231001', last_reviewed=days_ago(15), status='Active'),
            dict(title='Chemical Spill Response Plan', plan_type='Chemical Spill', location='Chemical Storage Area and Tank Farm', responsible_person='Wati Aziz', description='Emergency response procedures for chemical spill incidents at the chemical storage area and tank farm.', procedures='1. Alert all personnel in the area\n2. Evacuate upwind of the spill\n3. Don appropriate PPE before approaching\n4. Contain spill using spill kit materials\n5. Prevent entry to drains\n6. Contact HSE Manager and report to BNPD if significant release', assembly_point='Muster Point B — East Parking', emergency_contacts='BNPD (Pollution): +673 2380921\nHSE Manager: +673 8231001\nSite Supervisor: +673 8231003', last_reviewed=days_ago(45), status='Active'),
        ]
        for d in ep_data:
            EmergencyPlan.objects.get_or_create(title=d['title'], defaults=d)
        self.stdout.write(f'  {len(ep_data)} emergency plans created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating HSE audits...')
        audit_data = [
            dict(title='Q1 2024 Internal HSE Audit', audit_type='Internal', audit_date=days_ago(90), auditor='Ali Rahman', location='Full Site', findings='1. Scaffold toe boards missing in 2 locations\n2. LOTO log not up to date\n3. Chemical SDS sheets not current', corrective_actions='1. Toe boards installed within 24 hours\n2. LOTO log template updated and team briefed\n3. New SDS obtained and posted', status='Closed'),
            dict(title='Surprise HSE Inspection — Workshop', audit_type='Surprise', audit_date=days_ago(45), auditor='Sarah Abdullah', location='Workshop and Fabrication Area', findings='1. Two workers not wearing safety goggles during grinding\n2. Fire extinguisher overdue for inspection\n3. Housekeeping generally good', corrective_actions='1. Immediate verbal warning, refresher briefing conducted\n2. Fire extinguisher serviced and tagged', status='Closed'),
            dict(title='Q2 2024 Internal HSE Audit', audit_type='Internal', audit_date=days_ago(7), auditor='Ali Rahman', location='Full Site', findings='1. Emergency exit sign faded in Building C\n2. Noise level in generator room exceeds threshold without signage\n3. First aid kit in Site Office requires restocking', corrective_actions='1. New sign on order\n2. Noise warning signs to be installed\n3. First aid kit restocked', status='In Progress'),
        ]
        for d in audit_data:
            HseAudit.objects.get_or_create(title=d['title'], defaults=d)
        self.stdout.write(f'  {len(audit_data)} HSE audits created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating safe work practices...')
        swp_data = [
            dict(title='Safe Work Practice — Working at Height', category='Working at Heights', content='1. Conduct a pre-task risk assessment before starting any work at height.\n2. Inspect all fall protection equipment before each use.\n3. Always use a double lanyard system when within 2m of an unprotected edge.\n4. Barricade the area below to prevent injury from dropped objects.\n5. Never work at height during adverse weather conditions.\n6. Ensure rescue plan is in place and communicated before starting.'),
            dict(title='Safe Work Practice — Confined Space Entry', category='General Safety', content='1. Obtain a confined space entry permit before entering any confined space.\n2. Conduct atmospheric testing for oxygen, flammable gases, and toxic substances.\n3. Never enter a confined space alone — standby person required at all times.\n4. Wear appropriate PPE including SCBA if atmosphere is unknown.\n5. Establish communication with standby person before entry.\n6. Have a written rescue plan and rescue equipment on site.'),
            dict(title='Safe Work Practice — Hot Work', category='Fire Safety', content='1. Obtain a hot work permit and ensure a fire watch is assigned.\n2. Remove or protect all combustible materials within 10 metres.\n3. Inspect all welding and cutting equipment before use.\n4. Keep a charged fire extinguisher at the work site at all times.\n5. Continue fire watch for minimum 30 minutes after work completion.\n6. Check for smouldering materials before leaving the area.'),
            dict(title='Safe Work Practice — Electrical Isolation (LOTO)', category='Electrical Safety', content='1. Identify all energy sources before starting work on electrical equipment.\n2. Use the LOTO procedure — lock the isolator, tag it, and retain the key.\n3. Test for zero energy state with an approved voltage tester.\n4. Notify all affected personnel before isolation.\n5. Never remove another person\'s lock or tag.\n6. Restore energy only after all persons are clear and LOTO is formally removed.'),
            dict(title='Safe Work Practice — Manual Handling', category='Manual Handling', content='1. Assess the load before lifting — weight, size, shape, and stability.\n2. Use mechanical aids (pallet jack, trolley) whenever possible.\n3. For team lifts, designate one person to direct the lift.\n4. Keep the load close to the body and maintain neutral spine position.\n5. Avoid twisting — move your feet to change direction.\n6. Report any pain or discomfort immediately to your supervisor.'),
        ]
        for d in swp_data:
            SafeWorkPractice.objects.get_or_create(title=d['title'], defaults=d)
        self.stdout.write(f'  {len(swp_data)} safe work practices created.')

        # ------------------------------------------------------------------
        self.stdout.write('Creating workplace rules...')
        wr_data = [
            dict(title='Mandatory PPE at All Times', category='PPE', description='All personnel must wear the minimum mandatory PPE at all times while on site. Minimum requirements are: hard hat, safety boots, high-visibility vest, and safety glasses in designated areas.', consequence='Non-compliance will result in immediate removal from site and a formal written warning. Repeated offences may lead to termination of contract.', effective_date=days_ago(365)),
            dict(title='No Mobile Phone Use in Hazardous Areas', category='General Safety', description='The use of mobile phones is strictly prohibited in designated hazardous areas including the chemical store, fuel store, welding area, and areas where flammable materials are present.', consequence='First offence: verbal warning. Second offence: written warning. Third offence: removal from site.', effective_date=days_ago(365)),
            dict(title='Zero Tolerance — Alcohol and Drugs', category='General Safety', description='The presence of alcohol or any controlled substance on site is strictly prohibited. Any person found under the influence will be removed from site immediately. Random drug and alcohol testing may be conducted.', consequence='Immediate termination of employment or contract. The incident will be reported to the relevant authorities.', effective_date=days_ago(365)),
            dict(title='Permit to Work System Compliance', category='General Safety', description='All personnel must comply with the site Permit to Work system. Work classified as high-risk (hot work, confined space, working at height, electrical) must not commence without a valid issued permit.', consequence='Work to be stopped immediately. Formal investigation to be conducted. Responsible parties subject to disciplinary action.', effective_date=days_ago(180)),
            dict(title='Site Speed Limit — 10 kph', category='General Safety', description='All vehicles operating within the site boundary must not exceed 10 kilometres per hour. Pedestrian walkways must be respected and vehicles must give way to pedestrians at all times.', consequence='First offence: written warning. Repeat offence: removal of site vehicle access privileges.', effective_date=days_ago(300)),
        ]
        for d in wr_data:
            WorkplaceRule.objects.get_or_create(title=d['title'], defaults=d)
        self.stdout.write(f'  {len(wr_data)} workplace rules created.')

        # ------------------------------------------------------------------
        self.stdout.write(self.style.SUCCESS('\nSeed complete for Ali Company!'))
        self.stdout.write(f"""
  Summary:
    Staff              : {len(staffs)}
    Safety Cards       : {len(sc_entries)}
    Incidents          : {len(incident_data)}
    Permits to Work    : {len(ptws)}
    Job Safety Analyses: {len(jsas)}
    Training Records   : {len(training_data)}
    Toolbox Talks      : {len(tbt_data)}
    Site Visits        : {len(sv_data)}
    Equipment Items    : {len(equip_data)}
    Risk Register Proj : {len(rrps)}
    Risk Management    : {len(rm_data)}
    Risk Mitigations   : {len(rmit_data)}
    Emergency Plans    : {len(ep_data)}
    HSE Audits         : {len(audit_data)}
    Safe Work Practices: {len(swp_data)}
    Workplace Rules    : {len(wr_data)}
        """)
