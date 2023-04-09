from django.db import models
from .modelsMisc import why , what, lsr
from django.contrib.auth.models import  AbstractBaseUser, BaseUserManager
import uuid

# class MyAccountManager(BaseUserManager):
#     def create_user(self,  smart_card_number , email,password=None , username=None):
#       if not smart_card_number:
#             raise ValueError("Must enter a valid Smart Card Number")
#       user = self.model(
#         smart_card_number = smart_card_number,
#         email = self.normalize_email(email),
#         username = username
#       )
#       user.set_password(password)
#       user.save(using = self._db)
#       return user
    
#     def create_superuser(self, smart_card_number, password, email, username= None ):
#         user = self.create_user(  
#                smart_card_number = smart_card_number,
#                email = self.normalize_email(email),
#                password=password,
#                username=username
#         )
#         user.is_admin = True
#         user.is_staff = True
#         user.save(using=self._db)
#         return user
            
# class Account(AbstractBaseUser):
#     username = models.CharField(max_length=100, blank=True, null=True)
#     smart_card_number = models.CharField(unique=True, null=True, blank=True, max_length=9)
#     email = models.EmailField(verbose_name="Email", max_length=60, unique=True)

#     USERNAME_FIELD = 'smart_card_number'
#     REQUIRED_FIELDS = ['email']

#     objects = MyAccountManager()
    
#     def __str__(self):
#         return self.email
    
#     def has_perm(self, perm, obj=None):
#         return True
    
#     def has_module_perms(self, app_label):
#         return True

# class MyAccountManager(BaseUserManager):
#     def create_user(self, smart_card_no, email, password=None):
#         if not smart_card_no:
#             raise ValueError("Must enter a valid Smart Card Number")

#         user = self.model(
#             smart_card_no=smart_card_no,
#             email=self.normalize_email(email),
#         )
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, smart_card_no, email, password, username):
#         user = self.create_user(
#             smart_card_no=smart_card_no,
#             email=self.normalize_email(email),
#             password=password,
#         )
#         user.username = username
#         user.is_admin = True
#         user.is_staff = True
#         user.save(using=self._db)
#         return user


# class Account(AbstractBaseUser):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     username = models.CharField(max_length=225, null=False, blank=False)
#     smart_card_no = models.CharField(unique=True, null=True, blank=True, max_length=9)
#     email = models.EmailField(verbose_name="Email", max_length=60, unique=True)

#     USERNAME_FIELD = 'smart_card_no'
#     REQUIRED_FIELDS = ['email']

#     objects = MyAccountManager()

#     def __str__(self):
#         return self.email

#     def has_perm(self, perm, obj=None):
#         return self.is_admin

#     def has_module_perms(self, app_label):
#         return True

    
class MyAccountManager(BaseUserManager):
    def create_user(self,  smart_card_no , email,password=None ):
        if not smart_card_no:
            raise ValueError("Must enter a valid Smart Card Number")

        user = self.model(
               smart_card_no = smart_card_no,
               email = self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, smart_card_no, password, email ):
        user = self.create_user(  
               password=password,
               smart_card_no = smart_card_no,
               email = self.normalize_email(email),
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# Account provides all the models needed to build our account
# Check what has prem and module prems does

class Account(AbstractBaseUser):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    username = models.CharField(max_length=225, null=False, blank=False)
    # smart_card_no = models.BigIntegerField(unique=True, null=True, blank=True, validators=[MaxValueValidator(99999999)])
    smart_card_no = models.CharField(unique=True, null=True, blank=True, max_length=9)
    email = models.EmailField(verbose_name="Email", max_length=60, unique=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'smart_card_no'
    REQUIRED_FIELDS = ['email']

    objects = MyAccountManager()
    
    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

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
    




# Create your models here.
