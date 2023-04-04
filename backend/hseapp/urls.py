from .views import StaffViewSet, IncidentViewSet
# from .views import StaffViewSet
from rest_framework.routers import DefaultRouter
from hseapp import views

router = DefaultRouter()
router.register(r'staff', views.StaffViewSet, basename="staff")
router.register(r'incident', views.IncidentViewSet, basename="incident")
router.register(r'addincident', views.IncidentViewSet, basename="addincident")
router.register(r'incidenttable', views.IncidentViewSet, basename="incidenttable")
router.register(r'oneincident', views.IncidentViewSet, basename="oneincident")
# router.register(r'incidenttable/oneincident', views.IncidentViewSet, basename="incidenttable/oneincident")


urlpatterns = router.urls