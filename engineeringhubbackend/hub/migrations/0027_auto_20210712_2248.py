# Generated by Django 3.2.4 on 2021-07-12 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hub', '0026_trigram_similarity'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='group',
            name='isfaculty',
            field=models.BooleanField(default=False),
        ),
    ]