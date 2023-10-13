# Generated by Django 4.2.6 on 2023-10-13 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Maps',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('cord_x', models.CharField(max_length=30)),
                ('cord_y', models.CharField(max_length=30)),
                ('img_url', models.CharField(blank=True, max_length=200)),
                ('description', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Marker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('is_active', models.BooleanField(default=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='marker_photos/')),
                ('aftephoto', models.ImageField(blank=True, null=True, upload_to='marker_photos/')),
                ('discription', models.CharField(blank=True, max_length=140, null=True)),
            ],
        ),
    ]
