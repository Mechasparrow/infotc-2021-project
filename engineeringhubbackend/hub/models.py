from django.db import models

from django.contrib.auth.models import User

# Create your models here.

class Major(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return str(self.name)

class Department(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return str(self.name)

class College(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return str(self.name)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    yearsInSchool = models.IntegerField()

class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # TBD