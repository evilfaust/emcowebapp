from django.db import models

# Create your models here.
class Maps(models.Model):
    title = models.CharField(max_length=100)
    cord_x = models.CharField(max_length=30)
    cord_y = models.CharField(max_length=30)
    img_url = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=256)

    def __str__(self):
        return f'{self.title} {self.description}'
    

class Marker(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    is_active = models.BooleanField(default=True)
    photo = models.ImageField(upload_to='marker_photos/', blank=True, null=True)

    def __str__(self):
        return self.name