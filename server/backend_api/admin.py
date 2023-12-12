from django.contrib import admin
from .models import YouTubeVideo
from .models import Marker
from .models import News

admin.site.register(YouTubeVideo)
admin.site.register(Marker)
admin.site.register(News)