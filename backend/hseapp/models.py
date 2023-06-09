from django.db import models
from .modelsMisc import why , what, lsr
import uuid

class Staff(models.Model):
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
    raised_by  = models.ForeignKey(Staff, on_delete=models.CASCADE)
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

class RiskRegister(models.Model):
    date_raised = models.DateField(null=True, blank=True)
    risk_description = models.CharField(max_length=300, null=True, blank=True)
    likelihood_of_risk = models.CharField(max_length=300, null=True, blank=True)
    impact_of_risk = models.CharField(max_length=300, null=True, blank=True)
    severity = models.CharField(max_length=300, null=True, blank=True)
    owner = models.CharField(max_length=300, null=True, blank=True)
    mitigating_action = models.CharField(max_length=300, null=True, blank=True)
    contingency_action = models.CharField(max_length=300, null=True, blank=True)
    progress_on_actions = models.CharField(max_length=300, null=True, blank=True)
    status = models.CharField(max_length=300, null=True, blank=True)
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
    job_performer = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='job_safety_analysis_job_performer')
    supervisor = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='job_safety_analysis_supervisor')
    analysis_by = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='job_safety_analysis_analysis_by')
    company = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    department = models.CharField(max_length=100, null=True, blank=True)
    reviewed_by = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='job_safety_analysis_reviewed_by')
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
