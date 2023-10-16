from django.shortcuts import render, redirect
from maps.models import Maps, Marker
from django.contrib.auth import login
from .forms import RegistrationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import render, get_object_or_404



from .forms import MarkerForm
from news.models import News
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
    news_list = News.objects.all()
    # Переворачиваем список, чтобы новые новости были сверху
    news_list = reversed(news_list)
    context = {
        'news_list': news_list,
    }
    return render(request, 'index.html',  context)
    return render(request, 'index.html')
    current_user = request.user
    return render(request, 'index_home.html', {'current_user': current_user})
    


def news_list(request):
    news_list = News.objects.all()
    # Переворачиваем список, чтобы новые новости были сверху
    news_list = reversed(news_list)
    context = {
        'news_list': news_list,
    }
    return render(request, 'inweb_news.html',  context)


def news_detail(request, news_id):
    news = get_object_or_404(News, pk=news_id)
    return render(request, 'news_detail.html', {'news': news})
    





