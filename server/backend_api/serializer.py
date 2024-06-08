from django.forms import ValidationError
from rest_framework import serializers
from .models import YouTubeVideo
from .models import Marker
from .models import News
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise ValidationError("Неправильный Логин или Пароль")
        else:
            raise ValidationError("Must include 'username' and 'password'.")

        refresh = RefreshToken.for_user(user)
        data['user'] = user
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        return data





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