from django.shortcuts import render
from rest_framework.views import APIView

from .models import YouTubeVideo
from .serializer import YouTubeVideoSerializer

from .models import Marker
from .serializer import MarkerSerializer

from .models import News
from .serializer import NewsSerializer

from rest_framework.response import Response

from rest_framework import generics
from rest_framework.response import Response
from .serializer import UserSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.forms import ValidationError
from .models import YouTubeVideo, Marker, News, Notification
from .serializer import (
    YouTubeVideoSerializer,
    MarkerSerializer,
    NewsSerializer,
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    NotificationSerializer,
)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return Response({
                'user': {
                    'username': user.username,
                    'email': user.email,
                },
                'access': serializer.validated_data['access'],
                'refresh': serializer.validated_data['refresh']
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class YouTubeVideoView(APIView):
    def get(self, request):
        output = [
            {
                'title': video['title'],
                'channel': video['channel']
            } for video in YouTubeVideo.objects.all().values()
        ]
        return Response(output)
    
    def post(self, request):
        serializer = YouTubeVideoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)



class MarkerView(APIView):
    def get(self, request):
        output = [
            {
                'id': marker['id'],
                'name': marker['name'],
                'latitude': marker['latitude'],
                'longitude': marker['longitude'],
                'is_active': marker['is_active'],
                'photo': marker['photo'],
                'aftephoto': marker['aftephoto'],
                'discription': marker['discription'],
            } for marker in Marker.objects.all().values()
        ]
        return Response(output)
    
    def post(self, request):
        serializer = MarkerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        
class NewsView(APIView):
    def get(self, request):
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MarkerDetailView(APIView):
    def get_object(self, pk):
        try:
            return Marker.objects.get(pk=pk)
        except Marker.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        marker = self.get_object(pk)
        serializer = MarkerSerializer(marker)
        return Response(serializer.data)

    def patch(self, request, pk):
        marker = self.get_object(pk)
        serializer = MarkerSerializer(marker, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        marker = self.get_object(pk)
        marker.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    
class NewsDetailView(generics.RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        notification = get_object_or_404(Notification, pk=pk, user=request.user)
        serializer = NotificationSerializer(instance=notification, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
