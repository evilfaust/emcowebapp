# Generated by Django 4.2.3 on 2023-07-10 03:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0004_marker_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='marker',
            name='description',
            field=models.CharField(blank=True, max_length=256),
        ),
    ]