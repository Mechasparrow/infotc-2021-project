from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename="User")
router.register(r'skills', views.SkillViewSet, basename="Skill")
router.register(r'discliplines', views.DiscliplineViewSet, basename="Discliplines")
router.register(r'projects', views.ProjectViewSet, basename="Project")
router.register(r'groups', views.GroupViewSet, basename="Group")
router.register(r'project-proposals', views.ProjectProposalViewSet, basename="ProjectProposals")

urlpatterns = [
    path('', include(router.urls)),
    #path('users/<int:pk>/', views.user_detail),
    path('auth/', include('rest_framework.urls'))
]