from hub import serializers
from rest_framework import status,permissions, generics, mixins, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from . import serializers

from django.contrib.auth.models import User

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
    def add_user_skill(self, request, pk):
        located_user = User.objects.get(pk=pk)

        # Verify that located user is authenticated user TODO

        skill_pk = request.data['skill_pk']
        located_skill = models.Skill.objects.get(pk=skill_pk)

        located_user.user_skills.add(located_skill)
        located_user.save()

        return self.get_user_skills(request,pk)

    
    @action(detail=True, methods=['post'])
    def add_user_disclipline(self, request, pk):
        located_user = User.objects.get(pk=pk)

        # Verify that located user is authenticated user TODO

        disclipline_pk = request.data['disclipline_pk']
        located_disclipline = models.Disclipline.objects.get(pk=disclipline_pk)
        
        located_user.user_discliplines.add(located_disclipline)
        located_user.save()

        return self.get_user_discliplines(request,pk)

    @action(detail=False, methods=['post'])
    def create_user(self, request):
        user_serializer = serializers.NewUserSerializer(data=request.data)
        if (user_serializer.is_valid()):
            
            try:
                user = User.objects.create_user(username=user_serializer.data["username"], password=user_serializer.data["password"])
            
                user.save()

                token = Token.objects.create(user=user)
                token.save()

                return Response({"status": 200, "token": token.key})
            except:
                return Response({"status": 200,"reason": "Need unique username"})
        else:
            print("Data not valid")
            return Response({"status": 500})
