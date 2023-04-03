from django.shortcuts import render
from .models import Staff , Incident
# from .models import Staff 
from .serializers import StaffSeriallizer , IncidentSeriallizer
# from .serializers import StaffSeriallizer
from rest_framework import viewsets

class StaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSeriallizer 
    queryset = Staff.objects.all()

class IncidentViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentSeriallizer
    queryset = Incident.objects.all()

# Create your views here.
