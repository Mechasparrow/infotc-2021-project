from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

from . import models

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Skill
        fields = ['id', 'name']

class DiscliplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Disclipline
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    user_skills = SkillSerializer(read_only=True, many=True)
    user_discliplines = DiscliplineSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_skills','user_discliplines']


class NewUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)
    confirm_password = serializers.CharField(max_length=200)

    def validate(self,data):
        if (data['password'] != data['confirm_password']):
            raise serializers.ValidationError("Password and confirm password must match!")
        return data