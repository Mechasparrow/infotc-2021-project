from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename="User")
router.register(r'skills', views.SkillViewSet, basename="Skill")
router.register(r'discliplines', views.DiscliplineViewSet, basename="Discliplines")

urlpatterns = [
    path('', include(router.urls)),
    #path('users/<int:pk>/', views.user_detail),
    path('auth/', include('rest_framework.urls'))
]