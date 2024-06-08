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
from django.contrib.auth import authenticate
from django.contrib.auth import login



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
        output = [
            {
                'name': news['name'],
                'images': news['images'],
                'images2': news['images2'],
                'images3': news['images3'],
                'images4': news['images4'],
                'images5': news['images5'],
                'images6': news['images6'],
                'description': news['description'],
            } for news in News.objects.all().values()
        ]
        return Response(output)

    def post(self, request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
