from django.shortcuts import render
from rest_framework.views import APIView

from .models import YouTubeVideo
from .serializer import YouTubeVideoSerializer

from .models import Marker
from .serializer import MarkerSerializer

from .models import Maps
from .serializer import MapsSerializer

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


class MapsView(APIView):
    def get(self, request):
        output = [
            {
                'title': maps['title'],
                'cord_x': maps['cord_x'],
                'cord_y': maps['cord_y'],
                'img_url': maps['img_url'],
                'description': maps['description'],
                'aftephoto': maps['aftephoto'],
                'discription': maps['discription'],
            } for maps in Maps.objects.all().values()
        ]
        return Response(output)
    
    def post(self, request):
        serializer = MapsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
