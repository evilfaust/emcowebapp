from django.urls import path
from .views import map_view, add_marker

urlpatterns = [
    path('', map_view, name='map'),
    path('add_marker/', add_marker, name='add_marker'),
]
