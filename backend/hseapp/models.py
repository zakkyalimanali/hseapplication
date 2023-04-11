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


    def __str__(self):
        return self.name
    
class Incident(models.Model):
    short_desc = models.CharField(max_length=100, null=True , blank=True)
    what_happened = models.CharField(max_length= 500 , choices = what, null=True , blank= True)
    why_happened = models.CharField(max_length= 500 , choices = why, null=True , blank= True)
    date_raised = models.DateField(null=True , blank= True)
    raised_by  = models.ForeignKey(Staff, on_delete=models.CASCADE)
    life_saving_rule = models.CharField(max_length= 500 , choices = lsr, null=True , blank= True)
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

    


# Create your models here.
