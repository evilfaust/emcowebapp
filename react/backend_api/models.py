from django.db import models

class YouTubeVideo(models.Model):
    title = models.CharField(max_length=100)
    channel =  models.CharField(max_length=100)
    

class Marker(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    is_active = models.BooleanField(default=True)
    photo = models.ImageField(upload_to='marker_photos/', blank=True, null=True)
    aftephoto = models.ImageField(upload_to='marker_photos/', blank=True, null=True)
    discription = models.CharField(max_length=140, blank=True, null=True)

    def __str__(self):
        return self.name
    

class News(models.Model):
    name = models.TextField(max_length=4000)
    images = models.ImageField(upload_to='images/', blank=True)
    images2 = models.ImageField(upload_to='images/', blank=True)
    images3 = models.ImageField(upload_to='images/', blank=True)
    images4 = models.ImageField(upload_to='images/', blank=True)
    images5 = models.ImageField(upload_to='images/', blank=True)
    images6 = models.ImageField(upload_to='images/', blank=True)
    discription = models.TextField(blank=True, max_length=100000000)

    def __str__(self):
        return f'{self.name} {self.discription}'