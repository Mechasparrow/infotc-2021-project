from hub import serializers
from rest_framework import status,permissions, generics, mixins, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from . import serializers

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from . import models

class SkillViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = models.Skill.objects.all()
    serializer_class = serializers.SkillSerializer

class DiscliplineViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = models.Disclipline.objects.all()
    serializer_class = serializers.DiscliplineSerializer

class UserViewSet(viewsets.ViewSet):
    
    def retrieve(self, request, pk):
        queryset = User.objects.get(pk=pk)
        serializer = serializers.UserSerializer(queryset)
        return Response(serializer.data)

    def list(self, request):    
        queryset = User.objects.all()
        serializer = serializers.UserSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def get_user_skills(self, request, pk):
        located_user = User.objects.get(pk=pk).user_skills
        serializer = serializers.SkillSerializer(located_user, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def get_user_discliplines(self, request, pk):
        located_user = User.objects.get(pk=pk).user_discliplines
        serializer = serializers.DiscliplineSerializer(located_user, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    @permission_classes([permissions.IsAuthenticated])
    def add_user_skill(self, request, pk):
        located_user = User.objects.get(pk=pk)

        # Verify that located user is authenticated user TODO
        if request.user.is_authenticated and request.user == located_user:
            skill_pk = request.data['skill_pk']
            located_skill = models.Skill.objects.get(pk=skill_pk)

            located_user.user_skills.add(located_skill)
            located_user.save()

            return self.get_user_skills(request,pk)
        else:
            return Response(status=401)

    
    @action(detail=True, methods=['post'])
    @permission_classes([permissions.IsAuthenticated])
    def add_user_disclipline(self, request, pk):
        located_user = User.objects.get(pk=pk)
        
        # Verify that located user is authenticated user TODO
        if request.user.is_authenticated and request.user == located_user:
            disclipline_pk = request.data['disclipline_pk']
            located_disclipline = models.Disclipline.objects.get(pk=disclipline_pk)
            
            located_user.user_discliplines.add(located_disclipline)
            located_user.save()

            return self.get_user_discliplines(request,pk)
        else:
            return Response(status=401)

    @action(detail=False, methods=['get'])
    @permission_classes([permissions.IsAuthenticated])
    def get_logged_in_user(self,request):
        if (request.user.is_authenticated):
            queryset = request.user
            serializer = serializers.UserSerializer(queryset)
            return Response(serializer.data)
        else:
            return Response(status=401)

    @action(detail=False, methods=['post'])
    def user_login(self, request):

        username = request.data["username"]
        password = request.data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)

            if created:
                token.save()

            return Response({"status": 200, "token": token.key}) 
        else:
            return Response(status=401)

    @action(detail=False, methods=['post'])
    @permission_classes([permissions.IsAuthenticated])
    def user_logout(self, request):
        if request.user.is_authenticated:
            # Do something for authenticated users.    
            print (request.user.id)
            token = Token.objects.get(user=request.user.pk)
            token.delete()
            return Response({"message": "User Token deleted"})
        else:
            # Do something for anonymous users.
            return Response({"message": "User Token invalid"})


    @action(detail=False, methods=['post'])
    def user_signup(self, request):
        user_serializer = serializers.NewUserSerializer(data=request.data)
        if (user_serializer.is_valid()):
            
            try:
                print("try")
                user = User.objects.create_user(username=user_serializer.data["username"], password=user_serializer.data["password"])
            
                user.save()

                token = Token.objects.create(user=user)
                token.save()

                return Response({"status": 200, "token": token.key})
            except Exception as e:
                
                print(str(e))
                return Response(status=500)
        else:
            print("Data not valid")
            return Response(status=500)

class ProjectViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset=models.Project.objects.all()
    serializer_class=serializers.ProjectSerializer
    
    @action(detail=False, methods=['get'])
    @permission_classes([permissions.IsAuthenticated])
    def viewUserProjects(self,request):
        # Verify that located user is authenticated user TODO
        if request.user.is_authenticated:
            queryset = models.Project.objects.filter(owningUser=request.user)
            
            serializer = serializers.ProjectSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=401)

    @action(detail=False, methods=['get'])
    def searchProjects(self, request):
        searchString = request.data["search_query"]

        queryset = models.Project.objects.filter(name__search=searchString)

        serializer = serializers.ProjectSerializer(queryset,many=True)
        return Response(serializer.data)