from django.shortcuts import render, redirect
from maps.models import Maps, Marker


from .forms import MarkerForm

# from django.http import JsonResponse
import json
from json import dumps
# Create your views here.

def index_maps(request):

    all_metki = list(Maps.objects.values())
    markers = Marker.objects.all()


    return render(request, 'maps.html', {'data' : all_metki, 'markers': markers })


# from django.http import HttpResponse


# def index(request):
#     return HttpResponse('maps.html')

def add_marker(request):
    if request.method == 'POST':
        form = MarkerForm(request.POST, request.FILES)
        if form.is_valid():
            marker = form.save(commit=False)
            marker.photo = form.cleaned_data['photo']
            marker.save()
            return redirect('maps')  # Перенаправление на страницу с картой после успешного сохранения метки
    else:
        form = MarkerForm()
    return render(request, 'add_marker.html', {'form': form})



def map_view(request):
    markers = Marker.objects.all()
    return render(request, 'maps.html', {'markers': markers})


def index_home(request):
    return render(request, 'index.html')
