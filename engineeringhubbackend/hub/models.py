from typing import DefaultDict
from django.db import models

from django.contrib.auth.models import User
from django.db.models.fields import related

# Create your models here.

class Major(models.Model):
    name = models.CharField(max_length=200, unique=True)
    users = models.ManyToManyField(to=User, related_name="majors", blank=True)

    def __str__(self):
        return str(self.name)

class Department(models.Model):
    name = models.CharField(max_length=200, unique=True)
    users = models.ManyToManyField(to=User, related_name="departments", blank=True)

    def __str__(self):
        return str(self.name)

class College(models.Model):
    name = models.CharField(max_length=200, unique=True)
    users = models.ManyToManyField(to=User, related_name="colleges", blank=True)

    def __str__(self):
        return str(self.name)

class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_instructor")
    facultyPage = models.URLField(null = True, blank=True)

    def __str__(self):
        return str(self.user.username)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_student")
    yearsInSchool = models.IntegerField()

    def __str__(self):
        return str(self.user.username)

class Course(models.Model):
    name = models.CharField(max_length=200, unique=True)
    instructor = models.OneToOneField(Instructor, on_delete=models.SET_NULL, null=True, blank=True, related_name = "courses_taught")
    students = models.ManyToManyField(Student, blank=True, related_name = "courses_enrolled")

    def __str__(self):
        return str(self.name)

class Friendship(models.Model):
    userA = models.OneToOneField(User, on_delete=models.CASCADE, related_name="userA")
    userB = models.OneToOneField(User, on_delete=models.CASCADE, related_name="userB")

    class Meta:
        unique_together = ('userA', 'userB')

class Group(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name="owning_groups")
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    users = models.ManyToManyField(User, related_name="hub_groups", blank=True)
    isfaculty = models.BooleanField(default=False)

class Event(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="group_events")
    name = models.CharField(max_length=200)
    timeStart = models.DateTimeField()
    timeEnd = models.DateTimeField() 
    description = models.TextField()
    location = models.TextField()   

    users = models.ManyToManyField(User, related_name="events", blank=True)

class Message(models.Model):
    userFrom = models.ForeignKey(User, related_name="user_from", on_delete=models.SET_NULL, null=True, blank=True)
    groupFrom = models.ForeignKey(Group, related_name="group_from", on_delete=models.SET_NULL, null=True, blank=True)
    userTo = models.ForeignKey(User, related_name="user_to", on_delete=models.SET_NULL, null=True, blank=True)
    groupTo = models.ForeignKey(Group, related_name="group_to", on_delete=models.SET_NULL, null=True, blank=True)
    
    message = models.TextField(blank=True)
    timestamp = models.DateTimeField()

class ProjectProposal(models.Model):
    owningUser = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    owningGroup = models.ForeignKey(Group, on_delete=models.CASCADE, null=True,blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField()

class Project(models.Model):
    owningUser = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    owningGroup = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created = models.DateTimeField()
    complete = models.BooleanField(default=False)
    relatedProposal = models.ForeignKey(ProjectProposal, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_project")
    interestedUsers = models.ManyToManyField(User, related_name="interested_users", blank=True)
    private = models.BooleanField(default = False)

class ProjectNote(models.Model):
    title = models.CharField(max_length=200)
    relatedProject = models.ForeignKey(Project, on_delete=models.CASCADE)
    note = models.JSONField()
    created=models.DateTimeField()

class Disclipline(models.Model):
    name = models.CharField(max_length=200, unique=True)
    projects = models.ManyToManyField(Project, related_name="project_discliplines", blank=True)
    users = models.ManyToManyField(User, related_name="user_discliplines", blank=True)

class Skill(models.Model):
    name = models.CharField(max_length=200, unique=True)
    projects = models.ManyToManyField(Project, related_name="project_skills", blank=True)
    users = models.ManyToManyField(User, related_name="user_skills", blank=True)

