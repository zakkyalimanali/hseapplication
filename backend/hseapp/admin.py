# from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import HSEManagement
from .models import Incident

# Register your models here.

admin.site.register(HSEManagement)
admin.site.register(Incident)