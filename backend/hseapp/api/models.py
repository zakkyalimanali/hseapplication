from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_management = models.BooleanField(default=False)
    is_hse = models.BooleanField(default=False)
    is_worker = models.BooleanField(default=False)