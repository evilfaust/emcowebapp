from django.urls import path

from . import views


urlpatterns = [
    path("", views.index_maps, name="maps"),
    path('add_marker/', views.add_marker, name='add_marker'),
]