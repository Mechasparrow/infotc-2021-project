# Generated by Django 3.2.4 on 2021-06-18 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hub', '0016_project_projectnote'),
    ]

    operations = [
        migrations.CreateModel(
            name='Disclipline',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
        ),
    ]
