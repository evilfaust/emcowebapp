from django.forms import ValidationError
from rest_framework import serializers
from .models import YouTubeVideo, Marker, News, Notification, TruckComplaint, Review
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email','is_staff']

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
            raise ValidationError("Необходимо ввести Логин и Пароль'.")

        refresh = RefreshToken.for_user(user)
        data['user'] = user
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        return data





class YouTubeVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTubeVideo
        fields = '__all__'
        
class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = ['name', 'latitude', 'longitude', 'is_active', 'photo', 'aftephoto', 'discription']
        
class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id','name', 'images', 'images2', 'images3', 'images4', 'images5', 'images6', 'discription', 'small_discription']
        
        
        
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        
        
        
class TruckComplaintSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    class Meta:
        model = TruckComplaint
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user', 'created_at']
