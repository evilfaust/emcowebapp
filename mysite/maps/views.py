from django.shortcuts import render, redirect
from .models import Marker
from django.shortcuts import render, redirect
from django.urls import reverse


from django.shortcuts import render, redirect
from .forms import MarkerForm

def add_marker(request):
    if request.method == 'POST':
        form = MarkerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('map')  # Перенаправление на страницу с картой после успешного сохранения метки
    else:
        form = MarkerForm()
    return render(request, 'add_marker.html', {'form': form})



def map_view(request):
    markers = Marker.objects.all()
    return render(request, 'map.html', {'markers': markers})
