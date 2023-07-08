from django.contrib import admin

# Register your models here.
from maps.models import Maps, Marker


admin.site.register(Maps)
admin.site.register(Marker)