from django.db import models

from django.contrib.auth.models import User

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
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    facultyPage = models.URLField(null = True, blank=True)

    def __str__(self):
        return str(self.user.username)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    yearsInSchool = models.IntegerField()

    def __str__(self):
        return str(self.user.username)

class Course(models.Model):
    name = models.CharField(max_length=200)
    instructor = models.OneToOneField(Instructor, on_delete=models.SET_NULL, null=True, blank=True)
    students = models.ManyToManyField(Student, "courses", blank=True)

    def __str__(self):
        return str(self.name)

class Friendship(models.Model):
    userA = models.OneToOneField(User, on_delete=models.CASCADE, related_name="userA")
    userB = models.OneToOneField(User, on_delete=models.CASCADE, related_name="userB")

    class Meta:
        unique_together = ('userA', 'userB')