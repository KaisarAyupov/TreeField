# Generated by Django 3.2.13 on 2022-06-21 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0008_poi'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='rooms',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
