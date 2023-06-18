from django.shortcuts import render 
from .models import Staff , Incident ,Attendence , DateList ,ToolBoxTalk, Training , SiteVisit, SiteHazards, StaffAdd , IncidentInvestigation , IncidentFactors , EquipmentAndItems , ItemsPerBox, HSEManagement,  RiskRegister, IncidentPhotos,JobSafetyAnalysis , JobSafetyEquipment ,JobSafetySteps, JobSafetyHazards
from .serializers import StaffSeriallizer , IncidentSeriallizer , AttendenceSeriallizer , DateListSeriallizer , ToolBoxTalkSeriallizer, TrainingSerializer, SiteHazardsSerializer , SiteVisitSerializer, StaffAddSerializer, IncidentInvestigationSerializer , IncidentFactorsSerializer ,EquipmentAndItemsSerializer ,ItemsPerBoxSerializer, HSEManagementSerializer, RiskRegisterSerializer , IncidentPhotosSerializer, JobSafetyAnalysisSerializer , JobSafetyEquipmentSerializer , JobSafetyStepsSerializer, JobSafetyHazardsSerializer
from rest_framework import viewsets
from django.http import JsonResponse , request
# from django.views.decorators.http import require_GET
from django.views import View
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny

class StaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSeriallizer 
    queryset = Staff.objects.all()

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSeriallizer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class Incident(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        incidents = Incident.objects.all()
        serializer = IncidentSeriallizer(incidents, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = IncidentSeriallizer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class HSEManagementViewSet(viewsets.ModelViewSet):
    queryset = HSEManagement.objects.all()
    serializer_class = HSEManagementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class HSEManagement(APIView):
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        hses = HSEManagement.objects.all()
        serializer = HSEManagementSerializer(hses, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = HSEManagementSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RiskRegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RiskRegisterSerializer
    queryset = RiskRegister.objects.all()
    
class IncidentPhotosViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentPhotosSerializer
    queryset = IncidentPhotos.objects.all()    

# Create your views here.

class JobSafetyAnalysisViewSet(viewsets.ModelViewSet):
    serializer_class = JobSafetyAnalysisSerializer
    queryset = JobSafetyAnalysis.objects.all() 

class JobSafetyEquipmentViewSet(viewsets.ModelViewSet):
    serializer_class = JobSafetyEquipmentSerializer
    queryset = JobSafetyEquipment.objects.all() 

class JobSafetyStepsViewSet(viewsets.ModelViewSet):
    serializer_class = JobSafetyStepsSerializer
    queryset = JobSafetySteps.objects.all()

class JobSafetyHazardsViewSet(viewsets.ModelViewSet):
    serializer_class = JobSafetyHazardsSerializer
    queryset = JobSafetyHazards.objects.all()