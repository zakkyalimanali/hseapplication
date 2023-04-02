from django.shortcuts import render
from .models import Staff , Incident
from .serializers import StaffSeriallizer , IncidentSeriallizer
from rest_framework import viewsets

class StaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSeriallizer 
    queryset = Staff.objects.all()

class IncidentViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentSeriallizer
    queryset = Incident.objects.all()

# Create your views here.
