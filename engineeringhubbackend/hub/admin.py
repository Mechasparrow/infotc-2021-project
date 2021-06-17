from django.contrib import admin

# Register your models here.
from .models import Major, College, Department, Student, Instructor

admin.site.register(Major)

admin.site.register(College)

admin.site.register(Department)

admin.site.register(Student)

admin.site.register(Instructor)