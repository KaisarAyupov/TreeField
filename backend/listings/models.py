from distutils.command.upload import upload
from random import choices
from django.contrib.gis.db import models
from django.utils import timezone
from django.contrib.gis.geos import Point


class Listing(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    choices_area = (
        ('Inner Almaty', 'Inner Almaty'),
        ('Outer Almaty', 'Outer Almaty'),        
    )
    area = models.CharField(max_length=200, blank=True, null=True, choices=choices_area) # area
    borough = models.CharField(max_length=50, blank=True, null=True) # borough
    choices_listing_type = (
        ('House', 'House'),
        ('Apatment', 'Apatment'),
        ('Office', 'Office'),
    )
    listing_type = models.CharField(max_length=200, choices=choices_listing_type)    
    choices_property_status = (
        ('Critically Endangered', 'Critically Endangered'),
        ('Endangered', 'Endangered'),
        ('Vulnerable', 'Vulnerable'),
    )
    property_status = models.CharField(max_length=200, blank=True, choices=choices_property_status)
    price = models.DecimalField(max_digits=50, decimal_places=0 )
    choices_rental_frequency = (
        ('Month', 'Month'),
        ('Week', 'Week'),
        ('Day', 'Day'),
    )
    rental_frequency = models.CharField(max_length=200, null=True, choices=choices_rental_frequency)
    rooms = models.IntegerField(blank=True)
    finished = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)
    cctv = models.BooleanField(default=False)
    parking = models.BooleanField(default=False)
    data_posted = models.DateTimeField(default=timezone.now)
    location = models.PointField(blank=True, null=True, srid=4326)
    picture1 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture2 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture3 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture4 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture5 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")

    def __str__(self):
        return self.title