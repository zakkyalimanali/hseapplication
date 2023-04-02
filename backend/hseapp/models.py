from django.db import models
from .modelsMisc import why , what, lsr
import uuid

class Staff(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    name = models.CharField(max_length= 100 , null=True , blank= True)
    position = models.CharField(max_length= 100 , null=True , blank= True)
    staff_id_number = models.CharField(max_length= 100 , null=True , blank= True)

    def __str__(self):
        return self.staff_id_number
    
class Incident(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    short_desc = models.CharField(max_length=100, null=True , blank=True)
    what_happened = models.CharField(max_length= 100 , choices = what, null=True , blank= True)
    why_happened = models.CharField(max_length= 100 , choices = why, null=True , blank= True)
    date_raised = models.DateField(auto_now_add=True)
    raised_by  = models.ForeignKey(Staff, on_delete=models.CASCADE)
    life_saving_rule = models.CharField(max_length= 100 , choices = lsr, null=True , blank= True)
    findings = models.CharField(max_length= 100 , null=True , blank= True)
    incident_date = models.DateField(null=True , blank= True)
    location = models.CharField(max_length= 100 , null=True , blank= True)
    discussion = models.CharField(max_length= 100 , null=True , blank= True)
    target_date = models.DateField(max_length= 100 , null=True , blank= True)
    follow_up = models.BooleanField(default=False)
    follow_up_remarks = models.CharField(max_length= 100 , null=True , blank= True)
    status = models.CharField(max_length= 100 , null=True , blank= True)
    target_date = models.DateField(null=True , blank= True)

    def __str__(self):
        return self.short_desc



# Create your models here.
