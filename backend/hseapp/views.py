from django.shortcuts import render 
from .models import Staff , Incident ,Attendence , DateList ,ToolBoxTalk, Training , SiteVisit, SiteHazards, StaffAdd , IncidentInvestigation , IncidentFactors , EquipmentAndItems , ItemsPerBox
from .serializers import StaffSeriallizer , IncidentSeriallizer , AttendenceSeriallizer , DateListSeriallizer , ToolBoxTalkSeriallizer, TrainingSerializer, SiteHazardsSerializer , SiteVisitSerializer, StaffAddSerializer, IncidentInvestigationSerializer , IncidentFactorsSerializer ,EquipmentAndItemsSerializer ,ItemsPerBoxSerializer
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

class AttendenceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendenceSeriallizer
    queryset = Attendence.objects.all()

class DateListViewSet(viewsets.ModelViewSet):
    serializer_class = DateListSeriallizer
    queryset = DateList.objects.all()

class ToolBoxTalkViewSet(viewsets.ModelViewSet):
    serializer_class = ToolBoxTalkSeriallizer
    queryset = ToolBoxTalk.objects.all()

class TrainingViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingSerializer
    queryset = Training.objects.all()

class SiteVisitViewSet(viewsets.ModelViewSet):
    serializer_class = SiteVisitSerializer
    queryset = SiteVisit.objects.all()

class SiteHazardsViewSet(viewsets.ModelViewSet):
    serializer_class = SiteHazardsSerializer
    queryset = SiteHazards.objects.all()

class StaffAddViewSet(viewsets.ModelViewSet):
    serializer_class = StaffAddSerializer
    queryset = StaffAdd.objects.all()

class IncidentInvestigationViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentInvestigationSerializer
    queryset = IncidentInvestigation.objects.all()

class IncidentFactorsViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentFactorsSerializer
    queryset = IncidentFactors.objects.all()

class IncidentListView(View):
    def get(self, request):
        incidents = Incident.objects.all()
        what_happened_list = list(incidents.values_list('what_happened', flat=True))
        return JsonResponse({'what_happened_list': what_happened_list})

class EquipmentAndItemsViewSet(viewsets.ModelViewSet):
    serializer_class = EquipmentAndItemsSerializer
    queryset = EquipmentAndItems.objects.all()

class ItemsPerBoxViewSet(viewsets.ModelViewSet):
    serializer_class = ItemsPerBoxSerializer
    queryset = ItemsPerBox.objects.all()





# Create your views here.
