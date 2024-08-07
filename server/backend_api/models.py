from django.db import models
from django.contrib.auth.models import User  # Импортируем модель User



class YouTubeVideo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(default='Описание не предоставлено')
    video_url = models.URLField(default='https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    channel = models.CharField(max_length=100)
    
    def __str__(self):
        return self.title


    

class Marker(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    is_active = models.BooleanField(default=True)
    photo = models.ImageField(upload_to='marker_photos/', blank=True, null=True)
    aftephoto = models.ImageField(upload_to='marker_photos/', blank=True, null=True)
    discription = models.CharField(max_length=140, blank=True, null=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    

class News(models.Model):
    name = models.TextField(max_length=4000, verbose_name="Название", help_text="Подсказка - это будет отображаться в списке новостей.")
    small_discription = models.TextField(blank=True, max_length=100, verbose_name="Маленькое описание", help_text="Максимум 100 символов!      Используется для отображения неполного описания в списке новостей." )
    discription = models.TextField(blank=True, max_length=100000000, verbose_name="Описание", help_text="Ограничений нет!")
    images = models.ImageField(upload_to='images/', blank=True, help_text="Титульная фотография")
    images2 = models.ImageField(upload_to='images/', blank=True)
    images3 = models.ImageField(upload_to='images/', blank=True)
    images4 = models.ImageField(upload_to='images/', blank=True)
    images5 = models.ImageField(upload_to='images/', blank=True)
    images6 = models.ImageField(upload_to='images/', blank=True)
    
    def __str__(self):
        return f'{self.name} {self.discription}'
    
    
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Используем модель User здесь
    message = models.CharField(max_length=255)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message


class TruckComplaint(models.Model):
    truck_number = models.CharField(max_length=20)
    date_time = models.DateTimeField()
    media = models.FileField(upload_to='complaints_media/')
    complaint_text = models.TextField(default='No complaint text provided')  # Добавляем значение по умолчанию
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'Complaint on {self.truck_number} by {self.user.username if self.user else "Anonymous"}'

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(verbose_name="Текст отзыва")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    recipient = models.CharField(max_length=255, verbose_name="Адресат")
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f'Review by {self.user.username} to {self.recipient}'