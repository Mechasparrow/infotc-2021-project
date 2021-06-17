from django.db import models

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