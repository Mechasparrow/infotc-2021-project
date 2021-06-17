# Generated by Django 3.2.4 on 2021-06-17 19:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hub', '0003_auto_20210617_1859'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friendship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userA', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='userA', to=settings.AUTH_USER_MODEL)),
                ('userB', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='userB', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('userA', 'userB')},
            },
        ),
    ]
