# Generated by Django 3.2.13 on 2022-05-24 04:01

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField(blank=True, null=True)),
                ('area', models.CharField(blank=True, choices=[('Inner Almaty', 'Inner Almaty'), ('Outer Almaty', 'Outer Almaty')], max_length=200, null=True)),
                ('borough', models.CharField(blank=True, max_length=50, null=True)),
                ('listing_type', models.CharField(choices=[('House', 'House'), ('Apatment', 'Apatment'), ('Office', 'Office')], max_length=200)),
                ('property_status', models.CharField(blank=True, choices=[('Critically Endangered', 'Critically Endangered'), ('Endangered', 'Endangered'), ('Vulnerable', 'Vulnerable')], max_length=200)),
                ('price', models.DecimalField(decimal_places=0, max_digits=50)),
                ('rental_frequency', models.CharField(choices=[('Month', 'Month'), ('Week', 'Week'), ('Day', 'Day')], max_length=200, null=True)),
                ('rooms', models.IntegerField(blank=True)),
                ('finished', models.BooleanField(default=False)),
                ('pool', models.BooleanField(default=False)),
                ('elevator', models.BooleanField(default=False)),
                ('cctv', models.BooleanField(default=False)),
                ('parking', models.BooleanField(default=False)),
                ('data_posted', models.DateTimeField(default=django.utils.timezone.now)),
                ('location', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
            ],
        ),
    ]