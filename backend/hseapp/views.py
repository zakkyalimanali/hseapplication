from django.shortcuts import render 
from .models import Staff , Incident ,Attendence , DateList ,ToolBoxTalk, Training , SiteVisit, SiteHazards, StaffAdd , IncidentInvestigation , InvestigationTeamMember, IncidentFactors , EquipmentAndItems , ItemsPerBox, HSEManagement, HSERefrences, RiskRegister, IncidentPhotos,JobSafetyAnalysis , JobSafetyEquipment ,JobSafetySteps, JobSafetyHazards, IncidentEventPhotos , PermitToWork, HazardsAndPrecautions, PhysicalControls, Signitures , News , Blog,RiskRegisterProject , SafetyCard , SafetyCardPhotos, SafeWorkPractice, HseAudit, EmergencyPlan, RiskManagement, Report, WorkplaceRule, RiskMitigation
from .serializers import StaffSeriallizer , IncidentSeriallizer , AttendenceSeriallizer , DateListSeriallizer , ToolBoxTalkSeriallizer, TrainingSerializer, SiteHazardsSerializer , SiteVisitSerializer, StaffAddSerializer, IncidentInvestigationSerializer , InvestigationTeamMemberSerializer, IncidentFactorsSerializer ,EquipmentAndItemsSerializer ,ItemsPerBoxSerializer, HSEManagementSerializer, HSERefrencesSerializer,  RiskRegisterSerializer , IncidentPhotosSerializer, JobSafetyAnalysisSerializer , JobSafetyEquipmentSerializer , JobSafetyStepsSerializer, JobSafetyHazardsSerializer, IncidentEventPhotosSerializer , PermitToWorkSerializer, HazardsAndPrecautionsSerializer , PhysicalControlsSeralizer, SignituresSerializer , NewsSerializer , BlogSerializer , RiskRegisterProjectSerializer, SafetyCardSerializer, SafetyCardPhotosSerializer, SafeWorkPracticeSerializer, HseAuditSerializer, EmergencyPlanSerializer, RiskManagementSerializer, ReportSerializer, WorkplaceRuleSerializer, RiskMitigationSerializer
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
from .permissions import (
    IsCompanyAdmin, ReadOnlyOrHSEOfficer, ReadOnlyOrSupervisor,
    ReadOnlyOrCompanyAdmin, HSEOfficerOrAboveOnly,
)

class StaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSeriallizer
    queryset = Staff.objects.all()
    permission_classes = [IsCompanyAdmin]

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSeriallizer
    permission_classes = [ReadOnlyOrSupervisor]

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
    permission_classes = [ReadOnlyOrSupervisor]

class DateListViewSet(viewsets.ModelViewSet):
    serializer_class = DateListSeriallizer
    queryset = DateList.objects.all()
    permission_classes = [ReadOnlyOrSupervisor]

class ToolBoxTalkViewSet(viewsets.ModelViewSet):
    serializer_class = ToolBoxTalkSeriallizer
    queryset = ToolBoxTalk.objects.all()
    permission_classes = [ReadOnlyOrSupervisor]

class TrainingViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingSerializer
    queryset = Training.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class SiteVisitViewSet(viewsets.ModelViewSet):
    serializer_class = SiteVisitSerializer
    queryset = SiteVisit.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class SiteHazardsViewSet(viewsets.ModelViewSet):
    serializer_class = SiteHazardsSerializer
    queryset = SiteHazards.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class StaffAddViewSet(viewsets.ModelViewSet):
    serializer_class = StaffAddSerializer
    queryset = StaffAdd.objects.all()
    permission_classes = [ReadOnlyOrSupervisor]

class IncidentInvestigationViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentInvestigationSerializer
    queryset = IncidentInvestigation.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class InvestigationTeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = InvestigationTeamMemberSerializer
    queryset = InvestigationTeamMember.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class IncidentFactorsViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentFactorsSerializer
    queryset = IncidentFactors.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class IncidentListView(View):
    def get(self, request):
        incidents = Incident.objects.all()
        what_happened_list = list(incidents.values_list('what_happened', flat=True))
        return JsonResponse({'what_happened_list': what_happened_list})

class EquipmentAndItemsViewSet(viewsets.ModelViewSet):
    serializer_class = EquipmentAndItemsSerializer
    queryset = EquipmentAndItems.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class ItemsPerBoxViewSet(viewsets.ModelViewSet):
    serializer_class = ItemsPerBoxSerializer
    queryset = ItemsPerBox.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class HSERefrencesViewSet(viewsets.ModelViewSet):
    queryset = HSERefrences.objects.all()
    serializer_class = HSERefrencesSerializer
    permission_classes = [ReadOnlyOrCompanyAdmin]

class HSEManagementViewSet(viewsets.ModelViewSet):
    queryset = HSEManagement.objects.all()
    serializer_class = HSEManagementSerializer
    permission_classes = [ReadOnlyOrCompanyAdmin]

class HSEManagement(APIView):
    permission_classes = [IsAuthenticated]
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
    permission_classes = [ReadOnlyOrHSEOfficer]

class RiskRegisterProjectViewSet(viewsets.ModelViewSet):
    serializer_class = RiskRegisterProjectSerializer
    queryset = RiskRegisterProject.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class IncidentPhotosViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentPhotosSerializer
    queryset = IncidentPhotos.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class JobSafetyAnalysisViewSet(viewsets.ModelViewSet):
    serializer_class = JobSafetyAnalysisSerializer
    queryset = JobSafetyAnalysis.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class JobSafetyEquipmentViewSet(viewsets.ModelViewSet):
    serializer_class = JobSafetyEquipmentSerializer
    queryset = JobSafetyEquipment.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class JobSafetyStepsViewSet(viewsets.ModelViewSet):
    serializer_class = JobSafetyStepsSerializer
    queryset = JobSafetySteps.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class JobSafetyHazardsViewSet(viewsets.ModelViewSet):
    serializer_class = JobSafetyHazardsSerializer
    queryset = JobSafetyHazards.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class IncidentEventPhotosViewSet(viewsets.ModelViewSet):
    serializer_class = IncidentEventPhotosSerializer
    queryset = IncidentEventPhotos.objects.all()
    permission_classes = [ReadOnlyOrSupervisor]

class PermitToWorkViewSet(viewsets.ModelViewSet):
    serializer_class = PermitToWorkSerializer
    queryset = PermitToWork.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class HazardsAndPrecautionsViewSet(viewsets.ModelViewSet):
    serializer_class = HazardsAndPrecautionsSerializer
    queryset = HazardsAndPrecautions.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class PhysicalControlsViewSet(viewsets.ModelViewSet):
    serializer_class = PhysicalControlsSeralizer
    queryset = PhysicalControls.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class SignituresViewSet(viewsets.ModelViewSet):
    serializer_class = SignituresSerializer
    queryset = Signitures.objects.all()
    permission_classes = [ReadOnlyOrSupervisor]

class NewsViewSet(viewsets.ModelViewSet):
    serializer_class = NewsSerializer
    queryset = News.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class BlogViewSet(viewsets.ModelViewSet):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class SafetyCardViewSet(viewsets.ModelViewSet):
    serializer_class = SafetyCardSerializer
    queryset = SafetyCard.objects.all()
    permission_classes = [ReadOnlyOrSupervisor]

class SafetyCardPhotosViewSet(viewsets.ModelViewSet):
    serializer_class = SafetyCardPhotosSerializer
    queryset = SafetyCardPhotos.objects.all()
    permission_classes = [ReadOnlyOrSupervisor]

class SafeWorkPracticeViewSet(viewsets.ModelViewSet):
    serializer_class = SafeWorkPracticeSerializer
    queryset = SafeWorkPractice.objects.all()
    permission_classes = [ReadOnlyOrCompanyAdmin]

class HseAuditViewSet(viewsets.ModelViewSet):
    serializer_class = HseAuditSerializer
    queryset = HseAudit.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class EmergencyPlanViewSet(viewsets.ModelViewSet):
    serializer_class = EmergencyPlanSerializer
    queryset = EmergencyPlan.objects.all()
    permission_classes = [ReadOnlyOrCompanyAdmin]

class RiskManagementViewSet(viewsets.ModelViewSet):
    serializer_class = RiskManagementSerializer
    queryset = RiskManagement.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]

class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()
    permission_classes = [HSEOfficerOrAboveOnly]

class WorkplaceRuleViewSet(viewsets.ModelViewSet):
    serializer_class = WorkplaceRuleSerializer
    queryset = WorkplaceRule.objects.all()
    permission_classes = [ReadOnlyOrCompanyAdmin]

class RiskMitigationViewSet(viewsets.ModelViewSet):
    serializer_class = RiskMitigationSerializer
    queryset = RiskMitigation.objects.all()
    permission_classes = [ReadOnlyOrHSEOfficer]