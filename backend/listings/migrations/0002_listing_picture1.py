# Generated by Django 3.2.13 on 2022-05-25 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='picture1',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]