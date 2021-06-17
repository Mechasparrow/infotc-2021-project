from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.Major)
admin.site.register(models.College)
admin.site.register(models.Department)
admin.site.register(models.Student)
admin.site.register(models.Instructor)
admin.site.register(models.Course)
admin.site.register(models.Friendship)
