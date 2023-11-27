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
                'title': output['title'],
                'channel': output['channel']
            } for output in YouTubeVideo.objects.all().values()
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
                'title': output['title'],
                'channel': output['channel']
            } for output in Marker.objects.all().values()
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
                'title': output['title'],
                'channel': output['channel']
            } for output in Maps.objects.all().values()
        ]
        return Response(output)
    
    def post(self, request):
        serializer = MapsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)