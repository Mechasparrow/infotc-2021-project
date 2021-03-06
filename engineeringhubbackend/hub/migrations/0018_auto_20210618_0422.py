# Generated by Django 3.2.4 on 2021-06-18 04:22

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hub', '0017_disclipline_skill'),
    ]

    operations = [
        migrations.AddField(
            model_name='disclipline',
            name='projects',
            field=models.ManyToManyField(blank=True, related_name='project_discliplines', to='hub.Project'),
        ),
        migrations.AddField(
            model_name='disclipline',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='user_discliplines', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='skill',
            name='projects',
            field=models.ManyToManyField(blank=True, related_name='project_skills', to='hub.Project'),
        ),
        migrations.AddField(
            model_name='skill',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='user_skills', to=settings.AUTH_USER_MODEL),
        ),
    ]
