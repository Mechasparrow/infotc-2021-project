# Generated by Django 3.2.4 on 2021-06-17 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hub', '0007_auto_20210617_1910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='students',
            field=models.ManyToManyField(blank=True, related_name='courses', to='hub.Student'),
        ),
    ]