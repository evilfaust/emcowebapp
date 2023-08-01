from django.db import models

class Marker(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    images = models.ImageField(upload_to='images/')
    discription = models.CharField(blank=True)

    def __str__(self):
        return f'{self.name} {self.discription}'
