from django.shortcuts import render 
from .models import Staff , Incident , Account
from .serializers import StaffSeriallizer , IncidentSeriallizer , AccountSeriallizer
from rest_framework import viewsets
from django.http import JsonResponse , request
# from django.views.decorators.http import require_GET
from django.views import View

class StaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSeriallizer 
    queryset = Staff.objects.all()

class IncidentViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentSeriallizer
    queryset = Incident.objects.all()

class IncidentListView(View):
    def get(self, request):
        incidents = Incident.objects.all()
        what_happened_list = list(incidents.values_list('what_happened', flat=True))
        return JsonResponse({'what_happened_list': what_happened_list})

# Create your views here.

class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSeriallizer
    queryset = Account.objects.all()
