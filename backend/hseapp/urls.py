from .views import StaffViewSet, IncidentViewSet
from rest_framework.routers import DefaultRouter
from hseapp import views

router = DefaultRouter()
router.register(r'staff', views.StaffViewSet, basename="staff")
router.register(r'incident', views.IncidentViewSet, basename="incident")


urlpatterns = router.urls