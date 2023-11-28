from django.shortcuts import render
from rest_framework.views import APIView

from .models import YouTubeVideo
from .serializer import YouTubeVideoSerializer

from .models import Marker
from .serializer import MarkerSerializer

from .models import News
from .serializer import NewsSerializer

from rest_framework.response import Response


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


class MarkerView(APIView):
    def get(self, request):
        output = [
            {
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
