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
admin.site.register(models.Group)
admin.site.register(models.Event)
admin.site.register(models.Project)
admin.site.register(models.ProjectProposal)
admin.site.register(models.Skill)
admin.site.register(models.Disclipline)
admin.site.register(models.Message)