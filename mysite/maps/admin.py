from django.contrib import admin

# Register your models here.
from maps.models import Maps, Marker
from news.models import News


admin.site.register(Maps)
admin.site.register(Marker)
admin.site.register(News)