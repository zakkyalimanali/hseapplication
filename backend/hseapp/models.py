from django.db import models
from django.contrib.auth.models import User
from .modelsMisc import why , what, lsr
import uuid

class Staff(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='staff_profile')
    name = models.CharField(max_length= 100 , null=True , blank= True)
    position = models.CharField(max_length= 100 , null=True , blank= True)
    staff_id_number = models.CharField(max_length= 100 , null=True , blank= True)
    date_of_birth = models.DateField(null=True , blank=True)
    joining_date = models.DateField(null=True , blank=True)
    smart_card_number = models.IntegerField( null=True , blank=True)
    smart_card_colour = models.CharField(max_length=15, null=True, blank=True)
    gender=models.CharField(max_length=15, null=True , blank = True)
    home_address = models.CharField(max_length=100, null=True , blank=True)
    nationality = models.CharField(max_length=100, null=True, blank=True)
    citizenship = models.CharField(max_length=100, null=True, blank=True)
    telephone_number= models.IntegerField( null=True, blank=True)
    email_address = models.EmailField(max_length=200, blank=True, null=True)
    passport_number = models.CharField(max_length=30 , null=True, blank=True)
    passport_expiry_date = models.DateField(null=True, blank=True)
    yearly_leave_days = models.IntegerField(null=True, blank=True)
    yearly_leave_taken = models.IntegerField(null=True, blank=True)
    yearly_leave_left = models.IntegerField(null=True , blank=True)

    # def leave_left(self, *args , **kwargs):
    #     if self.yearly_leave_days != None:
    #         self.yearly_leave_left = self.yearly_leave_days - self.yearly_leave_taken
    #     super().save(*args , **kwargs)

    # @property
    # def yearly_leave_left(self):
    #     if self.yearly_leave_days is not None:
    #         return self.yearly_leave_days - self.yearly_leave_taken
    #     return None

    def save(self, *args, **kwargs):
        if self.yearly_leave_days is not None:
            self.yearly_leave_left = self.yearly_leave_days - self.yearly_leave_taken
        super().save(*args, **kwargs)



    def __str__(self):
        return self.name
    
class Incident(models.Model):
    short_desc = models.CharField(max_length=100, null=True , blank=True)
    what_happened = models.CharField(max_length= 500 , null=True , blank= True)
    why_happened = models.CharField(max_length= 500 , null=True , blank= True)
    date_raised = models.DateField(null=True , blank= True)
    raised_by  = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True)
    life_saving_rule = models.CharField(max_length= 500 , null=True , blank= True)
    findings = models.CharField(max_length= 100 , null=True , blank= True)
    incident_date = models.DateField(null=True , blank= True)
    location = models.CharField(max_length= 100 , null=True , blank= True)
    discussion = models.CharField(max_length= 100 , null=True , blank= True)
    target_date = models.DateField(null=True , blank= True)
    follow_up = models.CharField(max_length= 100 , null=True , blank= True)
    follow_up_remarks = models.CharField(max_length= 100 , null=True , blank= True)
    status = models.CharField(max_length= 100 , null=True , blank= True)
    responsible_party = models.CharField(max_length= 100 , null=True , blank= True)
    # photo_image = models.ImageField(upload_to="photo_image/", height_field=None, width_field=None, max_length=100,null=True , blank= True)
    # photo_image = models.ImageField(upload_to='post_images', null=True, blank=True)
    def __str__(self):
        return self.short_desc
    
class IncidentEventPhotos(models.Model): 
    title = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    # image = models.ImageField(upload_to='post_images', null=True, blank=True)
    incident_photo = models.ImageField(upload_to='post_images', null=True, blank=True)
    incident= models.ForeignKey(Incident, on_delete=models.CASCADE, null=True, blank = True)
    
    def __str__(self):
        return self.title    
    



class DateList(models.Model):
    date_attendence = models.DateField(null=True , blank=True)

class Attendence(models.Model):
    # attendence_date = models.ForeignKey(DateList, on_delete=models.CASCADE)
    attendence_date = models.DateField(null=True , blank= True)
    staff_name = models.ForeignKey(Staff, on_delete=models.CASCADE)
    attendence_status = models.CharField(max_length= 100 , null=True , blank= True)

class ToolBoxTalk(models.Model):
    toolbox_date = models.DateField(null=True , blank= True)
    topic = models.CharField(max_length= 100 , null=True , blank= True)
    presenter = models.ForeignKey(Staff, on_delete=models.CASCADE , null=True , blank= True, related_name='toolbox_talks_presenter')
    project = models.CharField(max_length= 100 , null=True , blank= True)
    supervisor = models.ForeignKey(Staff, on_delete=models.CASCADE , null=True , blank= True, related_name='toolbox_talks_supervissor')
    time = models.TimeField(null=True , blank= True)
    crew_number = models.IntegerField(null=True , blank= True)
    attendees = models.IntegerField(null=True , blank= True)
    address = models.CharField(max_length= 500 , null=True , blank= True)
    employer = models.CharField(max_length= 100 , null=True , blank= True)
    shift = models.CharField(max_length= 100 , null=True , blank= True)
    textbox = models.TextField(max_length=1000, null=True , blank=True )
    # attendeesone = models.ForeignKey(Staff, on_delete=models.CASCADE , related_name='toolbox_talks_attendeesone')
    # attendeestwo = models.ForeignKey(Staff, on_delete=models.CASCADE , related_name='toolbox_talks_attendeestwo')
    # attendeesthree = models.ForeignKey(Staff, on_delete=models.CASCADE , related_name='toolbox_talks_attendeesthree')
    # attendeesfour = models.ForeignKey(Staff, on_delete=models.CASCADE , related_name='toolbox_talks_attendeesfour')
    # attendeesfive = models.ForeignKey(Staff, on_delete=models.CASCADE , related_name='toolbox_talks_attendeesfive')

# class Training(models.Model):
#     staff_name = models.ForeignKey(Staff, related_name='trainings_as_staff_name', on_delete=models.CASCADE , null=True , blank= True, )
#     training_date = models.DateField(null=True , blank= True)
#     training_expiry = models.DateField(null=True , blank= True)
#     training = models.CharField(max_length=200, null=True , blank= True)
#     training_provider = models.CharField(max_length=200, null=True , blank= True)
#     position = models.ForeignKey(Staff, related_name='trainings_as_staff_position', on_delete=models.CASCADE , null=True , blank= True, )
       
class Training(models.Model):
    staff_name = models.ForeignKey(Staff, related_name='trainings_staff_name', on_delete=models.CASCADE, null=True, blank=True)
    training_date = models.DateField(null=True, blank=True)
    training_expiry = models.DateField(null=True, blank=True)
    training = models.CharField(max_length=200, null=True, blank=True)
    training_provider = models.CharField(max_length=200, null=True, blank=True)
    # staff_position = models.ForeignKey(Staff, related_name='trainings_staff_position', on_delete=models.CASCADE, null=True, blank=True)

# Create your models here.

class SiteVisit(models.Model):
    inspector = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True) 
    inspection_date = models.DateField(null=True, blank=True)
    inspection_time = models.TimeField(null=True , blank=True)
    location = models.CharField(max_length=100 , blank=True , null=True)

class SiteHazards(models.Model):
    visit = models.ForeignKey(SiteVisit, on_delete=models.CASCADE, null=True, blank=True)
    hazard = models.CharField(max_length=1000, null=True, blank=True)
    status = models.CharField(max_length=20, null=True, blank=True)
    notes = models.CharField(max_length=1000, null=True, blank=True)
    # images

class StaffAdd(models.Model):
    visit = models.ForeignKey(SiteVisit, on_delete=models.CASCADE, null=True, blank=True)
    staff_name = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True)

class IncidentInvestigation(models.Model):
    investigator = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='incidentinvestigation_investigator', null=True, blank = True)
    date_of_incident = models.DateField(null=True, blank=True)
    location_of_incident = models.CharField(max_length=100 , null=True, blank=True)
    team_member_one = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='incidentinvestigation_team_member_one',null=True, blank = True)
    team_member_two = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='incidentinvestigation_team_member_two',null=True, blank = True)
    team_member_three = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='incidentinvestigation_team_member_three',null=True, blank = True)
    team_member_four = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='incidentinvestigation_team_member_four',null=True, blank = True)
    task_performed = models.CharField(max_length=1000 , null=True, blank=True)
    what_happened = models.CharField(max_length=1000 , null=True, blank=True)
    summary_of_remedial_action = models.CharField(max_length=2000 , null=True, blank=True)
    summary_of_incident_investigation = models.CharField(max_length=2000 , null=True, blank=True)


class InvestigationTeamMember(models.Model):
    ROLE_LEAD = 'Lead'
    ROLE_MEMBER = 'Member'
    ROLE_CHOICES = [(ROLE_LEAD, 'Lead'), (ROLE_MEMBER, 'Member')]

    incidentinvestigation = models.ForeignKey(IncidentInvestigation, on_delete=models.CASCADE, related_name='team_members', null=True, blank=True)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_MEMBER)


class IncidentFactors(models.Model): 
    factor = models.CharField(max_length=200 , null=True, blank=True)
    type_of_factor = models.CharField(max_length=200 , null=True, blank=True)
    action_taken = models.CharField(max_length=200 , null=True, blank=True)
    who_will_fix = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True)
    when_will_fix = models.DateField(null=True, blank = True)
    planned_completion_date = models.DateField(null=True, blank=True)
    incidentinvestigation = models.ForeignKey(IncidentInvestigation, on_delete=models.CASCADE, null=True, blank = True)

class EquipmentAndItems(models.Model):
    equipment_item = models.CharField(max_length=200 , null=True, blank=True)
    type_of_equipment_item = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    quantity_in_item = models.IntegerField(null=True , blank=True)
    dollar_value = models.IntegerField(null=True, blank=True)
    condition = models.CharField(max_length=200 , null=True, blank=True)
    storage_location = models.CharField(max_length=200 , null=True, blank=True)
    identification_code = models.CharField(max_length=200 , null=True, blank=True)
    size = models.CharField(max_length=200 , null=True, blank=True)

class ItemsPerBox(models.Model):
    item = models.ForeignKey(EquipmentAndItems, on_delete=models.CASCADE , null=True, blank = True)
    quantity_in_box = models.IntegerField(null=True, blank=True)

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class HSEManagement(models.Model): 
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    # image = models.ImageField(upload_to='post_images', null=True, blank=True)
    management_commitment_document = models.FileField(upload_to='post_documents', null=True, blank=True)
    
    def __str__(self):
        return self.title
    
class HSERefrences(models.Model): 
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    # image = models.ImageField(upload_to='post_images', null=True, blank=True)
    hse_document = models.FileField(upload_to='post_documents', null=True, blank=True)
    
    def __str__(self):
        return self.title
    
class WorkplaceRule(models.Model):
    CATEGORY_CHOICES = [
        ('General Safety', 'General Safety'),
        ('PPE', 'PPE'),
        ('Fire Safety', 'Fire Safety'),
        ('Chemical Handling', 'Chemical Handling'),
        ('Electrical Safety', 'Electrical Safety'),
        ('Working at Heights', 'Working at Heights'),
        ('Confined Spaces', 'Confined Spaces'),
        ('Manual Handling', 'Manual Handling'),
        ('Other', 'Other'),
    ]
    title = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    consequence = models.TextField(null=True, blank=True)
    effective_date = models.DateField(null=True, blank=True)
    document = models.FileField(upload_to='post_documents', null=True, blank=True)
    created_on = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title or ''


class RiskMitigation(models.Model):
    PRIORITY_CHOICES = [
        ('Critical', 'Critical'),
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]
    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        ('Verified', 'Verified'),
    ]
    risk_title = models.CharField(max_length=200, null=True, blank=True)
    mitigation_action = models.TextField(null=True, blank=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, null=True, blank=True)
    responsible_person = models.CharField(max_length=100, null=True, blank=True)
    target_date = models.DateField(null=True, blank=True)
    completion_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    created_on = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return self.risk_title or ''


class Report(models.Model):
    REPORT_TYPE_CHOICES = [
        ('Incident', 'Incident Report'),
        ('Audit', 'Audit Report'),
        ('Training', 'Training Report'),
        ('Risk', 'Risk Report'),
        ('Site Visit', 'Site Visit Report'),
        ('Permit to Work', 'Permit to Work Report'),
        ('Custom', 'Custom Report'),
    ]
    title = models.CharField(max_length=200, null=True, blank=True)
    report_type = models.CharField(max_length=50, choices=REPORT_TYPE_CHOICES, null=True, blank=True)
    period_from = models.DateField(null=True, blank=True)
    period_to = models.DateField(null=True, blank=True)
    generated_by = models.CharField(max_length=100, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    document = models.FileField(upload_to='post_documents', null=True, blank=True)
    created_on = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title or ''

class RiskManagement(models.Model):
    LIKELIHOOD_CHOICES = [
        ('1', 'Rare'),
        ('2', 'Unlikely'),
        ('3', 'Possible'),
        ('4', 'Likely'),
        ('5', 'Almost Certain'),
    ]
    CONSEQUENCE_CHOICES = [
        ('1', 'Insignificant'),
        ('2', 'Minor'),
        ('3', 'Moderate'),
        ('4', 'Major'),
        ('5', 'Catastrophic'),
    ]
    CATEGORY_CHOICES = [
        ('Physical', 'Physical'),
        ('Chemical', 'Chemical'),
        ('Biological', 'Biological'),
        ('Ergonomic', 'Ergonomic'),
        ('Psychosocial', 'Psychosocial'),
        ('Environmental', 'Environmental'),
        ('Other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Closed', 'Closed'),
    ]
    title = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, null=True, blank=True)
    hazard_description = models.TextField(null=True, blank=True)
    likelihood = models.CharField(max_length=2, choices=LIKELIHOOD_CHOICES, null=True, blank=True)
    consequence = models.CharField(max_length=2, choices=CONSEQUENCE_CHOICES, null=True, blank=True)
    existing_controls = models.TextField(null=True, blank=True)
    additional_controls = models.TextField(null=True, blank=True)
    responsible_person = models.CharField(max_length=100, null=True, blank=True)
    target_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Open', null=True, blank=True)
    created_on = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title or ''

class EmergencyPlan(models.Model):
    PLAN_TYPE_CHOICES = [
        ('Fire', 'Fire'),
        ('Medical', 'Medical'),
        ('Chemical Spill', 'Chemical Spill'),
        ('Natural Disaster', 'Natural Disaster'),
        ('Evacuation', 'Evacuation'),
        ('Other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Active', 'Active'),
        ('Under Review', 'Under Review'),
        ('Archived', 'Archived'),
    ]
    title = models.CharField(max_length=200, null=True, blank=True)
    plan_type = models.CharField(max_length=50, choices=PLAN_TYPE_CHOICES, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    responsible_person = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    procedures = models.TextField(null=True, blank=True)
    assembly_point = models.CharField(max_length=200, null=True, blank=True)
    emergency_contacts = models.TextField(null=True, blank=True)
    last_reviewed = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft', null=True, blank=True)
    document = models.FileField(upload_to='post_documents', null=True, blank=True)
    created_on = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title or ''

class HseAudit(models.Model):
    AUDIT_TYPE_CHOICES = [
        ('Internal', 'Internal'),
        ('External', 'External'),
        ('Regulatory', 'Regulatory'),
        ('Surprise', 'Surprise'),
    ]
    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Closed', 'Closed'),
    ]
    title = models.CharField(max_length=200, null=True, blank=True)
    audit_type = models.CharField(max_length=50, choices=AUDIT_TYPE_CHOICES, null=True, blank=True)
    audit_date = models.DateField(null=True, blank=True)
    auditor = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    findings = models.TextField(null=True, blank=True)
    corrective_actions = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Open', null=True, blank=True)
    document = models.FileField(upload_to='post_documents', null=True, blank=True)
    created_on = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title or ''

class SafeWorkPractice(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    document = models.FileField(upload_to='post_documents', null=True, blank=True)
    created_on = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title or ''

class RiskRegisterProject(models.Model):
    project_name = models.CharField(max_length=300, null=True, blank=True)
    date_raised = models.DateField(auto_now_add=True ,null=True, blank=True)
    date_reviewed = models.DateField(auto_now=True, null=True, blank=True)
    raised_by = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True, related_name='risk_register_project_raised_by')
    reviewed_by = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True,  related_name='risk_register_project_reviewed_by')

class RiskRegister(models.Model):
    project_name = models.ForeignKey(RiskRegisterProject, on_delete=models.CASCADE, null=True, blank = True)
    date_raised = models.DateField(auto_now_add=True ,null=True, blank=True)
    date_reviewed = models.DateField(auto_now=True, null=True, blank=True)
    raised_by = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True, related_name='risk_register_raised_by')
    reviewed_by = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True,  related_name='risk_register_reviewed_by')
    risk_description = models.CharField(max_length=300, null=True, blank=True)
    ### this describes the risk there
    likelihood_of_risk = models.CharField(max_length=300, null=True, blank=True)
    ### this a ranking from 1 - 5
    impact_of_risk = models.CharField(max_length=300, null=True, blank=True)
    ### this should be a range from low , medium , high , highest 
    severity = models.CharField(max_length=300, null=True, blank=True)
    ### this is a mix of both the likelyhood and risk to show if this is a priority risk
    responsible_party = models.CharField(max_length=300, null=True, blank=True)
    ### we should have two versions of this, one with staff and one without staff
    mitigating_action = models.CharField(max_length=300, null=True, blank=True)
    ### initial mitigation
    contingency_action = models.CharField(max_length=300, null=True, blank=True)
    ### what if the migations do not work
    ### follow the pyramid of risk... 
    progress_on_actions = models.CharField(max_length=300, null=True, blank=True)
    ### this is to show what has been done so far
    status = models.CharField(max_length=300, null=True, blank=True)
    ### This should be a dropdown if it is still open or closed
    # useful_resources = 


class IncidentPhotos(models.Model): 
    title = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    # image = models.ImageField(upload_to='post_images', null=True, blank=True)
    incident_photo = models.ImageField(upload_to='post_images', null=True, blank=True)
    incidentinvestigation = models.ForeignKey(IncidentInvestigation, on_delete=models.CASCADE, null=True, blank = True)
    
    def __str__(self):
        return self.title

class JobSafetyAnalysis(models.Model):
    job_title = models.CharField(max_length=100, null=True, blank=True)
    jsa_id = models.CharField(max_length=100, null=True, blank=True)
    job_performer = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='job_safety_analysis_job_performer', null=True, blank=True)
    supervisor = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='job_safety_analysis_supervisor' , null=True, blank=True)
    analysis_by = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='job_safety_analysis_analysis_by', null=True, blank=True)
    company = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    department = models.CharField(max_length=100, null=True, blank=True)
    reviewed_by = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='job_safety_analysis_reviewed_by' , null=True, blank=True)
    date_raised = models.DateField(null=True, blank=True)


class JobSafetyEquipment(models.Model):
    job_safety_analysis = models.ForeignKey(JobSafetyAnalysis, on_delete=models.CASCADE)
    safety_equipment = models.CharField(max_length=100, null=True, blank=True)

class JobSafetySteps(models.Model):
    job_safety_analysis = models.ForeignKey(JobSafetyAnalysis, on_delete=models.CASCADE)
    job_steps = models.CharField(max_length=300, null=True, blank=True)
    
class JobSafetyHazards(models.Model):
    job_safety_analysis = models.ForeignKey(JobSafetyAnalysis, on_delete=models.CASCADE)
    hazards = models.CharField(max_length=300, null=True, blank=True)
    controls = models.CharField(max_length=300, null=True, blank=True)

class PermitToWork(models.Model):
    permit_number = models.CharField(max_length=300, null=True, blank=True)
    location_of_work = models.CharField(max_length=300, null=True, blank=True)
    nature_of_work = models.CharField(max_length=300, null=True, blank=True)
    work_start = models.DateField(null=True, blank=True)
    work_start_time = models.TimeField(null=True, blank=True)
    work_completed = models.DateField(null=True, blank=True)
    

class HazardsAndPrecautions(models.Model):
    permit_to_work = models.ForeignKey(PermitToWork, on_delete=models.CASCADE)
    hazards = models.CharField(max_length=300, null=True, blank=True)
    precautions = models.CharField(max_length=300, null=True, blank=True)

class PhysicalControls(models.Model):
    permit_to_work = models.ForeignKey(PermitToWork, on_delete=models.CASCADE)
    control_mechanisms =  models.CharField(max_length=300, null=True, blank=True)
    control_how_will_it_help = models.CharField(max_length=300, null=True, blank=True)

# class DetailOfWorkCompetentPersonSigniture(models.Model):
#     competant_person_details_of_work_name = models.CharField(Staff, on_delete=models.CASCADE, null=True, blank = True)
#     competant_person_signiture_details_of_work = models.ImageField(upload_to='post_images', null=True, blank=True)
#     date_time_signed = models.DateTimeField(auto_now=True)

# class DetailOfWorkWorkerSigniture(models.Model):
#     worker_details_of_work_name = models.CharField(Staff, on_delete=models.CASCADE, null=True, blank = True)
#     worker_signiture_details_of_work = models.ImageField(upload_to='post_images', null=True, blank=True)
#     date_time_signed = models.DateTimeField(auto_now=True)



# class AcceptanceCompetentPersonSigniture(models.Model):
#     competant_person_acceptance_name = models.CharField(Staff, on_delete=models.CASCADE, null=True, blank = True)
#     competant_person_signiture_acceptance = models.ImageField(upload_to='post_images', null=True, blank=True)
#     date_time_signed = models.DateTimeField(auto_now=True)

# class CompletionOfWorkCompetentPersonSigniture(models.Model):
#     competant_person_signiture_completion_of_work_name = models.CharField(Staff, on_delete=models.CASCADE, null=True, blank = True)
#     competant_person_signiture_completion_of_work = models.ImageField(upload_to='post_images', null=True, blank=True)
#     date_time_signed = models.DateTimeField(auto_now=True)

# class FinalSignOffSigniture(models.Model):
#     authorized_person_name = models.CharField(Staff, on_delete=models.CASCADE, null=True, blank = True)
#     authorized_person_signiture = models.ImageField(upload_to='post_images', null=True, blank=True)
#     date_time_signed = models.DateTimeField(auto_now=True)
class Signitures(models.Model):
    permit_to_work = models.ForeignKey(PermitToWork, on_delete=models.CASCADE)
    person_name = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True)
    person_signiture = models.ImageField(upload_to='post_images', null=True, blank=True)
    signiture_for = models.CharField(max_length=100 , null=True, blank=True)
    position_class = models.CharField(max_length=100 , null=True, blank=True)
    date_time_signed = models.DateTimeField(auto_now=True)

class News(models.Model):
    person_name = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True)
    headline = models.CharField(max_length=100 , null=True, blank=True)
    textbrief = models.CharField(max_length=500 , null=True, blank=True)
    textcontent = models.TextField(max_length=2000 , null=True , blank=True)
    news_date = models.DateField(auto_now=True)
    # news_image = models.ImageField(upload_to='post_images', null=True, blank=True)

class Blog(models.Model):
    person_name = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True)
    headline = models.CharField(max_length=100 , null=True, blank=True)
    textbrief = models.CharField(max_length=500 , null=True, blank=True)
    textcontent = models.TextField(max_length=2000 , null=True , blank=True)
    blog_date = models.DateField(auto_now=True)

class SafetyCard(models.Model): 
    short_desc = models.CharField(max_length=200, null=True , blank=True)
    raised_by  = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank = True)
    what_happened = models.CharField(max_length= 500 , null=True , blank= True)
    why_happened = models.CharField(max_length= 500 , null=True , blank= True)
    date_raised = models.DateField(null=True , blank= True)
    life_saving_rule = models.CharField(max_length= 500 , null=True , blank= True)
    findings = models.CharField(max_length= 100 , null=True , blank= True)
    incident_date = models.DateField(null=True , blank= True)
    location = models.CharField(max_length= 100 , null=True , blank= True)
    discussion = models.CharField(max_length= 100 , null=True , blank= True)
    target_date = models.DateField(null=True , blank= True)
    follow_up = models.CharField(max_length= 100 , null=True , blank= True)
    follow_up_remarks = models.CharField(max_length= 100 , null=True , blank= True)
    status = models.CharField(max_length= 100 , null=True , blank= True)
    responsible_party = models.CharField(max_length= 100 , null=True , blank= True)

    def __str__(self):
        return self.short_desc
    
class SafetyCardPhotos(models.Model): 
    title = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    # image = models.ImageField(upload_to='post_images', null=True, blank=True)
    incident_photo = models.ImageField(upload_to='post_images', null=True, blank=True)
    incident= models.ForeignKey(SafetyCard, on_delete=models.CASCADE, null=True, blank = True)
    
    def __str__(self):
        return self.title    