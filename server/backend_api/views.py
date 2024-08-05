from django.shortcuts import render
from rest_framework.views import APIView

from .models import YouTubeVideo
from .serializer import YouTubeVideoSerializer

from .models import Marker
from .serializer import MarkerSerializer

from .models import News
from .serializer import NewsSerializer

from rest_framework.response import Response


from rest_framework import permissions

from rest_framework.permissions import IsAuthenticatedOrReadOnly



from rest_framework import generics
from .serializer import UserSerializer, RegisterSerializer, LoginSerializer, TruckComplaintSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404


from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.forms import ValidationError

from .models import YouTubeVideo, Marker, News, Notification, TruckComplaint, Review
from .serializer import (
    YouTubeVideoSerializer,
    MarkerSerializer,
    NewsSerializer,
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    NotificationSerializer,
    TruckComplaintSerializer,
    ReviewSerializer,
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
        videos = YouTubeVideo.objects.all()
        serializer = YouTubeVideoSerializer(videos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = YouTubeVideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class YouTubeVideoDetailView(APIView):
    def get_object(self, pk):
        try:
            return YouTubeVideo.objects.get(pk=pk)
        except YouTubeVideo.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        video = self.get_object(pk)
        serializer = YouTubeVideoSerializer(video)
        return Response(serializer.data)

    def patch(self, request, pk):
        video = self.get_object(pk)
        serializer = YouTubeVideoSerializer(video, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        video = self.get_object(pk)
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



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
    permission_classes = [IsAuthenticatedOrReadOnly]

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

class NewsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        return get_object_or_404(News, pk=pk)

    def get(self, request, pk):
        news = self.get_object(pk)
        serializer = NewsSerializer(news)
        return Response(serializer.data)

    def patch(self, request, pk):
        news = self.get_object(pk)
        serializer = NewsSerializer(news, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        news = self.get_object(pk)
        news.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
    
    
    
class TruckComplaintView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        complaints = TruckComplaint.objects.all()
        serializer = TruckComplaintSerializer(complaints, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TruckComplaintSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user if request.user.is_authenticated else None
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        instance.approved = data.get("approved", instance.approved)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)