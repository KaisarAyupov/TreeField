# Generated by Django 3.2.13 on 2022-06-08 05:32

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0007_rename_finished_listing_furnished'),
    ]

    operations = [
        migrations.CreateModel(
            name='Poi',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=120, null=True)),
                ('type', models.CharField(choices=[('University', 'University'), ('Hospital', 'Hospital'), ('Stadium', 'Stadium')], max_length=50)),
                ('location', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
            ],
        ),
    ]
