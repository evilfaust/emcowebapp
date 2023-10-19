from django.db import models

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
