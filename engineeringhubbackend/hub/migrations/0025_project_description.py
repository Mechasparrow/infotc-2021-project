# Generated by Django 3.2.4 on 2021-07-02 21:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hub', '0024_project_private'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
