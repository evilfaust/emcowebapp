from django.shortcuts import render, redirect
from maps.models import Maps, Marker
from django.contrib.auth import login
from .forms import SignUpForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


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
    current_user = request.user
    return render(request, 'index_home.html', {'current_user': current_user})

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('index_home')  # Замените 'home' на имя вашей главной страницы
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index_home')  # Редирект на главную страницу после успешного входа
        else:
            error_message = "Неправильное имя пользователя или пароль"
    else:
        error_message = ""
    
    return render(request, 'login.html', {'error_message': error_message})

def user_logout(request):
    logout(request)
    return redirect('index_home')
