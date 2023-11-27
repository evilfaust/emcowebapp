from rest_framework import serializers
from .models import YouTubeVideo
from .models import Marker, Maps



class YouTubeVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTubeVideo
        fields = ['title', 'channel']
        
class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = ['name', 'latitude', 'longitude', 'is_active', 'photo', 'aftephoto', 'discription']

        
class MapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ['title', 'cord_x', 'cord_y', 'img_url', 'description', 'aftephoto', 'discription']
