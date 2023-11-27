from django.contrib import admin
from .models import YouTubeVideo
from .models import Marker
from .models import Maps

admin.site.register(YouTubeVideo)
admin.site.register(Maps)
admin.site.register(Marker)