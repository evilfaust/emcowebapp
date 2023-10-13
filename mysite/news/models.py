from django.db import models

class News(models.Model):
    name = models.CharField(max_length=4000)
    images = models.ImageField(upload_to='images/', blank=True)
    images2 = models.ImageField(upload_to='images/', blank=True)
    images3 = models.ImageField(upload_to='images/', blank=True)
    images4 = models.ImageField(upload_to='images/', blank=True)
    images5 = models.ImageField(upload_to='images/', blank=True)
    images6 = models.ImageField(upload_to='images/', blank=True)
    discription = models.CharField(blank=True, max_length=100000000)

    def __str__(self):
        return f'{self.name} {self.discription}'
