# # from .views import StaffViewSet, IncidentViewSet , UserRegister, UserLogin, UserLogout, UserView

# # from .views import StaffViewSet
# from rest_framework.routers import DefaultRouter
# from hseapp import views
# from django.urls import path , include


# router = DefaultRouter()
# router.register(r'staff', views.StaffViewSet, basename="staff")
# router.register(r'incident', views.IncidentViewSet, basename="incident")
# router.register(r'addincident', views.IncidentViewSet, basename="addincident")
# router.register(r'incidenttable', views.IncidentViewSet, basename="incidenttable")
# router.register(r'oneincident', views.IncidentViewSet, basename="oneincident")
# # router.register(r'about', views.IncidentViewSet, basename="about")

# # path('register', views.UserRegister.as_view(), name='register'),
# # path('login', views.UserLogin.as_view(), name='login'),
# # path('logout', views.UserLogout.as_view(), name='logout'),
# # path('user', views.UserView.as_view(), name='user'),

# # # router.register(r'incidenttable/oneincident', views.IncidentViewSet, basename="incidenttable/oneincident")


# # urlpatterns = router.urls

# urlpatterns = [
#     path('register', views.UserRegister.as_view(), name='register'),
#     path('login', views.UserLogin.as_view(), name='login'),
#     path('logout', views.UserLogout.as_view(), name='logout'),
#     path('user', views.UserView.as_view(), name='user'),
#     path('', include(router.urls)),
# ] 

# from django.urls import include, path
# from rest_framework import routers
# from hseapp import views

# router = routers.DefaultRouter()
# router.register(r'staff', views.StaffViewSet)
# router.register(r'incident', views.IncidentViewSet)

# urlpatterns = [
#     path('register', views.UserRegister.as_view(), name='register'),
#     path('login', views.UserLogin.as_view(), name='login'),
#     path('logout', views.UserLogout.as_view(), name='logout'),
#     path('user', views.UserView.as_view(), name='user'),
#     path('', include(router.urls)),
# ]

from django.urls import path, include
from rest_framework import routers
from hseapp import views

router = routers.DefaultRouter()
router.register(r'staff', views.StaffViewSet)
router.register(r'incident', views.IncidentViewSet)
router.register(r'addincident', views.IncidentViewSet, basename="addincident")
router.register(r'incidenttable', views.IncidentViewSet, basename="incidenttable")
router.register(r'oneincident', views.IncidentViewSet, basename="oneincident")
# router.register(r'register', views.UserRegister, basename="register")
# router.register(r'login', views.UserLogin, basename="login")
# router.register(r'logout', views.UserLogout, basename="logout")
# router.register(r'user', views.UserView, basename="user")
# router.register(r'register', views.UserRegister, basename="register")

urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    path('', include(router.urls)),
]
# urlpatterns = router.urls