# from .views import StaffViewSet, IncidentViewSet 
# from .views import StaffViewSet
from rest_framework.routers import DefaultRouter
from hseapp import views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'staff', views.StaffViewSet, basename="staff")
router.register(r'incident', views.IncidentViewSet, basename="incident")
router.register(r'addincident', views.IncidentViewSet, basename="addincident")
router.register(r'incidenttable', views.IncidentViewSet, basename="incidenttable")
router.register(r'oneincident', views.IncidentViewSet, basename="oneincident")
router.register(r'attendence', views.AttendenceViewSet, basename="attendence")
router.register(r'datelist', views.DateListViewSet, basename="datelist")
router.register(r'toolboxtalk', views.ToolBoxTalkViewSet, basename="toolboxtalk")
router.register(r'training', views.TrainingViewSet, basename="training")
router.register(r'sitevisit', views.SiteVisitViewSet, basename="sitevisit")
router.register(r'sitehazard', views.SiteHazardsViewSet, basename="sitehazard")
router.register(r'staffadd', views.StaffAddViewSet, basename="staffadd")
router.register(r'incidentinvestigation', views.IncidentInvestigationViewSet, basename='incidentinvestigation'),
router.register(r'incidentfactors', views.IncidentFactorsViewSet, basename='incidentfactors'),
router.register(r'equipmentanditems', views.EquipmentAndItemsViewSet, basename='equipmentanditems')
router.register(r'itemsperbox', views.ItemsPerBoxViewSet, basename='itemsperbox')
router.register(r'hsemanagement', views.HSEManagementViewSet, basename='hsemanagement')
router.register(r'hsereferences', views.HSERefrencesViewSet, basename="hsereferences")
router.register(r'riskregister', views. RiskRegisterViewSet, basename='riskregister')
router.register(r'incidentphotos', views.IncidentPhotosViewSet, basename='incidentphotos')
router.register(r'jobsafetyanalysis', views.JobSafetyAnalysisViewSet, basename='jobsafetyanalysis')
router.register(r'jobsafetyequipment', views.JobSafetyEquipmentViewSet, basename='jobsafetyequipment')
router.register(r'jobsafetysteps', views.JobSafetyStepsViewSet, basename='jobsafetysteps')
router.register(r'jobsafetyhazards', views.JobSafetyHazardsViewSet, basename="jobsafetyhazards")
router.register(r'incidenteventphotos', views.IncidentEventPhotosViewSet, basename='incidenteventphotos')
router.register(r'permittowork', views.PermitToWorkViewSet, basename='permittowork')
router.register(r'hazardsandprecautions', views.HazardsAndPrecautionsViewSet, basename='hazardsandprecautions')
router.register(r'physicalcontrols', views.PhysicalControlsViewSet, basename='physicalcontrols')
router.register(r'signitures', views.SignituresViewSet, basename="signitures")
router.register(r'news', views.NewsViewSet, basename = 'news')
router.register(r'blog', views.BlogViewSet, basename='blog')

# router.register(r'about', views.IncidentViewSet, basename="about")

# router.register(r'incidenttable/oneincident', views.IncidentViewSet, basename="incidenttable/oneincident")


urlpatterns = router.urls
# static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)