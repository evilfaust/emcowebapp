from django.shortcuts import render, redirect
from .models import Marker
from django.urls import reverse


from django.shortcuts import render, redirect
from .forms import MarkerForm
from django.core.files.storage import FileSystemStorage


def add_marker(request):
    if request.method == 'POST' and request.FILES:
        # получаем загруженный файл
        file = request.FILES['photo']
        fs = FileSystemStorage()
        # сохраняем на файловой системе
        filename = fs.save(file.name, file)
        # получение адреса по которому лежит файл
        file_url = fs.url(filename)
        form = MarkerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('map')  # Перенаправление на страницу с картой после успешного сохранения метки
    else:
        form = MarkerForm()
    return render(request, 'add_marker.html', {'form': form}, { 'file_url': file_url })





# def add_marker(request):
#     if request.method == 'POST':
#         form = MarkerForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('map')  # Перенаправление на страницу с картой после успешного сохранения метки
#     else:
#         form = MarkerForm()
#     return render(request, 'add_marker.html', {'form': form})


# from django.core.files.storage import FileSystemStorage

# def home_page(request):
#     # POST - обязательный метод
#     if request.method == 'POST' and request.FILES:
#         # получаем загруженный файл
#         file = request.FILES['myfile1']
#         fs = FileSystemStorage()
#         # сохраняем на файловой системе
#         filename = fs.save(file.name, file)
#         # получение адреса по которому лежит файл
#         file_url = fs.url(filename)
#         return render(request, 'home_page.html', {
#             'file_url': file_url
#         })
#     return render(request, 'home_page.html')


def map_view(request):
    markers = Marker.objects.all()
    return render(request, 'map.html', {'markers': markers})


