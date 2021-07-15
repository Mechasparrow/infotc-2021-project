from hub import serializers
from rest_framework import status,permissions, generics, mixins, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.postgres.search import TrigramSimilarity

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

    @action(detail=False,methods=['get'])    
    def searchUsers(self, request):
        searchString = request.query_params.get("search_query", "")

        queryset = User.objects.annotate(
            similarity=TrigramSimilarity('username', searchString)
        ).filter(similarity__gt=0.2).order_by('-similarity')

        serializer = serializers.UserSerializer(queryset,many=True)
        return Response(serializer.data)

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
            skill_name = request.data['name']

            located_skill, skill_created = models.Skill.objects.get_or_create(name=skill_name)

            if (skill_created):
                located_skill.save()

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
            disclipline_name = request.data['name']
            located_disclipline, disclipline_created = models.Disclipline.objects.get_or_create(name=disclipline_name)
            
            if (disclipline_created):
                located_disclipline.save()

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


class ProjectProposalViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset=models.ProjectProposal.objects.all()
    serializer_class=serializers.ProjectProposalSerializer

    @permission_classes([permissions.IsAuthenticated])
    def create(self,request):
        serializer = serializers.ProjectProposalSerializer(data=request.data)

        if (request.user.is_authenticated and serializer.is_valid()):    
            
            serializer.save(owningUser=request.user)
            return Response(serializer.data, status=200)
        else:
            return Response(status=401)    

    @action(detail=False,methods=['get'])    
    def searchProjectProposals(self, request):
        searchString = request.query_params.get("search_query", "")

        queryset = models.ProjectProposal.objects.annotate(
            similarity=TrigramSimilarity('name', searchString)
        ).filter(similarity__gt=0.2).order_by('-similarity')

        serializer = serializers.ProjectProposalSerializer(queryset,many=True)
        return Response(serializer.data)

class GroupViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset=models.Group.objects.all()
    serializer_class=serializers.GroupSerializer

    @action(detail=False,methods=['get'])    
    def searchGroups(self, request):
        searchString = request.query_params.get("search_query", "")

        queryset = models.Group.objects.annotate(
            similarity=TrigramSimilarity('name', searchString)
        ).filter(similarity__gt=0.2).order_by('-similarity')

        serializer = serializers.GroupSerializer(queryset,many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    @permission_classes([permissions.IsAuthenticated])
    def getUserGroups(self, request):
        located_owning_groups = models.Group.objects.filter(owner=request.user)
        located_attending_groups = models.Group.objects.filter(users=request.user)
        
        located_groups = located_owning_groups.union(located_attending_groups)

        if (request.user.is_authenticated):
            serializer = serializers.GroupSerializer(located_groups, many=True)
            return Response(serializer.data)
        else:
            return Response(status=401)

    @action(detail=True, methods=['get'])
    @permission_classes([permissions.IsAuthenticated])
    def isOwnedByUser(self, request, pk):
        group = models.Group.objects.get(pk=pk)

        if (request.user.is_authenticated):
            user_owns_group = group.owner == request.user
            return Response(user_owns_group)
        else:
            return Response(status=401)

    @action(detail=True, methods=['delete'])
    @permission_classes([permissions.IsAuthenticated])
    def deleteGroup(self, request, pk):
        located_group = models.Group.objects.get(pk=pk)

        if (request.user.is_authenticated and located_group.owner == request.user):
            located_group.delete()
            serializer = serializers.GroupSerializer(located_group)
            return Response(serializer.data)
        else:
            return Response(status=401)

    @action(detail=True, methods=['get'])
    def getGroupUsers(self, request, pk):
        located_group = models.Group.objects.get(pk=pk)

        serializer = serializers.UserSerializer(located_group.users, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def getGroupEvents(self, request, pk):
        located_group = models.Group.objects.get(pk=pk)

        serializer = serializers.EventSerializer(located_group.group_events, many=True)
        return Response(serializer.data)

class ProjectNoteViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):

    queryset=models.ProjectNote.objects.all()
    serializer_class=serializers.ProjectNoteSerializer
    
    @action(detail=True,methods=['delete'])
    @permission_classes([permissions.IsAuthenticated])
    def deleteProjectNote(self, request, pk):
        located_project_note = models.ProjectNote.objects.get(pk=pk)

        if (request.user.is_authenticated and request.user == located_project_note.relatedProject.owningUser):    
            located_project_note.delete()
            serializer = serializers.ProjectNoteSerializer(located_project_note)
            return Response("deleted", status=200)
        else:
            return Response(status=401)    

class ProjectViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    
    queryset=models.Project.objects.all()
    serializer_class=serializers.ProjectSerializer

    @action(detail=False, methods=['get'])
    def public(self, request):
        public_projects = models.Project.objects.filter(private = False)
        serializer = serializers.ProjectSerializer(public_projects, many=True)
        return Response(serializer.data)

    @permission_classes([permissions.IsAuthenticated])
    def create(self, request):
        serializer = serializers.ProjectSerializer(data=request.data)

        if (request.user.is_authenticated and serializer.is_valid()):
            serializer.save(owningUser=request.user)
            return Response(serializer.data)
        else:
            return Response(status=401)

    
    @permission_classes([permissions.IsAuthenticated])
    def update(self, request, pk):
        
        project = models.Project.objects.get(pk=pk)

        project_data = request.data["project"]
        
        skill_data = request.data["skills"]
        print("skills")
        print(skill_data)
        disclipline_data = request.data["discliplines"]
        print("discliplines")
        print(disclipline_data)


        project_serializer = serializers.ProjectSerializer(project,data=project_data)

        if (request.user.is_authenticated and project_serializer.is_valid()):
            
            project_serializer.save()
            
            updated_project = models.Project.objects.get(pk=project_serializer.data["id"])

            updated_project.project_skills.clear()
            updated_project.project_discliplines.clear()

            for skill in skill_data:
                skill_name = skill["name"]
                located_skill, skill_created = models.Skill.objects.get_or_create(name=skill_name)

                if (skill_created):
                    located_skill.save()

                updated_project.project_skills.add(located_skill)

            for disclipline in disclipline_data:
                disclipline_name = disclipline["name"]
                located_disclipline, disclipline_created = models.Disclipline.objects.get_or_create(name=disclipline_name)

                if (disclipline_created):
                    located_disclipline.save()

                updated_project.project_discliplines.add(located_disclipline)

            updated_project.save()

            project_serializer = serializers.ProjectSerializer(updated_project)
            print(project_serializer.data)

            return Response(project_serializer.data)
        else:
            return Response(status=401)

    @action(detail=True, methods=['get'])
    @permission_classes([permissions.IsAuthenticated])
    def getUserProject(self, request, pk):
        located_project = models.Project.objects.get(pk=pk)

        if (request.user.is_authenticated and request.user == located_project.owningUser):
            serializer = serializers.ProjectSerializer(located_project)
            return Response(serializer.data)
        else:
            return Response(status=401)

    @action(detail=True,methods=['post'])
    def createProjectNote(self, request, pk):
        located_project = models.Project.objects.get(pk=pk)
        
        if (request.user.is_authenticated and request.user == located_project.owningUser):
            serializer = serializers.ProjectNoteSerializer(data=request.data)
            if (serializer.is_valid()):
                serializer.save(relatedProject=located_project)

            return Response(serializer.data)
        else:
            return Response(status=401)

    @action(detail=True,methods=['put'])
    def updateProjectNote(self, request, pk):
        located_project = models.Project.objects.get(pk=pk)
        located_project_note = models.ProjectNote.objects.get(relatedProject=located_project, pk=request.data["id"])

        if (request.user.is_authenticated and request.user == located_project.owningUser):
            serializer = serializers.ProjectNoteSerializer(located_project_note, data=request.data)

            if (serializer.is_valid()):
                serializer.save()

            return Response(serializer.data)
        else:
            return Response(status=401)


    @action(detail=True, methods=['get'])
    def getProjectNotes(self, request, pk):
        located_project = models.Project.objects.get(pk=pk)
        located_project_skills = models.ProjectNote.objects.filter(relatedProject=located_project)

        #TODO project note serializer
        serializer = serializers.ProjectNoteSerializer(located_project_skills, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['put'])
    @permission_classes([permissions.IsAuthenticated])
    def updateUserProject(self, request, pk):

        pass

    @action(detail=True,methods=['delete'])
    @permission_classes([permissions.IsAuthenticated])
    def deleteUserProject(self, request, pk):
        located_project = models.Project.objects.get(pk=pk)
        if (request.user.is_authenticated and request.user == located_project.owningUser):
            located_project.delete()
            return Response(status=200)
        else:
            return Response(status=401)

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
    @permission_classes([permissions.IsAuthenticated])
    def viewUserProjectsWithSearch(self,request):
        # TODO
        pass

    @action(detail=False, methods=['get'])
    def searchProjects(self, request):
        searchString = request.query_params["search_query"]

        queryset = models.Project.objects.annotate(
            similarity=TrigramSimilarity('name', searchString)
        ).filter(similarity__gt=0.2,private=False).order_by('-similarity')

        serializer = serializers.ProjectSerializer(queryset,many=True)
        return Response(serializer.data)