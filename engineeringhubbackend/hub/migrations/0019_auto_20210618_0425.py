# Generated by Django 3.2.4 on 2021-06-18 04:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hub', '0018_auto_20210618_0422'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='owningGroup',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hub.group'),
        ),
        migrations.AlterField(
            model_name='project',
            name='owningUser',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
