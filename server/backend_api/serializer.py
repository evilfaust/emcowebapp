from rest_framework import serializers
from .models import YouTubeVideo
from .models import Marker
from .models import News



class YouTubeVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTubeVideo
        fields = ['title', 'channel']
        
class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = ['name', 'latitude', 'longitude', 'is_active', 'photo', 'aftephoto', 'description']
        
class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['name', 'images', 'images2', 'images3', 'images4', 'images5', 'images6', 'discription']
