from django.contrib import admin
from .models import YouTubeVideo
from .models import Marker
from .models import News

# Регистрируем модель Marker в админке
@admin.register(Marker)
class MarkerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'latitude', 'longitude', 'photo', 'aftephoto','is_active', 'is_admin')
    search_fields = ('name', 'id')  # Поля для поиска
    list_filter = ('is_active',)  # Фильтр по полю is_active


admin.site.register(YouTubeVideo)
admin.site.register(News)