from django.db import models

class News(models.Model):
    name = models.CharField(max_length=100)
    images = models.ImageField(upload_to='images/')
    discription = models.CharField(blank=True, max_length=500)

    def __str__(self):
        return f'{self.name} {self.discription}'
