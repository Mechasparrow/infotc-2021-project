# Generated by Django 3.2.4 on 2021-07-01 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hub', '0023_auto_20210620_0408'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='private',
            field=models.BooleanField(default=False),
        ),
    ]
