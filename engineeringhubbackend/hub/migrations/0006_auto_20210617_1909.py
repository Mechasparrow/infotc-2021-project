# Generated by Django 3.2.4 on 2021-06-17 19:09

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hub', '0005_alter_instructor_facultypage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='college',
            name='users',
            field=models.ManyToManyField(null=True, related_name='colleges', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='course',
            name='students',
            field=models.ManyToManyField(null=True, related_name='courses', to='hub.Student'),
        ),
        migrations.AlterField(
            model_name='department',
            name='users',
            field=models.ManyToManyField(null=True, related_name='departments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='major',
            name='users',
            field=models.ManyToManyField(null=True, related_name='majors', to=settings.AUTH_USER_MODEL),
        ),
    ]
