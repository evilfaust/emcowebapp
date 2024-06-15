"""
URL configuration for react project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.urls import re_path as url
from backend_api.views import*
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from backend_api.views import MarkerDetailView

from backend_api.views import RegisterView, LoginView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', YouTubeVideoView.as_view(), name='home'),  # Путь для корневого URL
    path('youtube/', YouTubeVideoView.as_view(), name='youtube-view'),
    path('marker/', MarkerView.as_view(), name='marker-view'),
    path('news/', NewsView.as_view(), name='news-view'),
    
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    path('api/markers/<int:pk>/', MarkerDetailView.as_view(), name='marker-detail'),
    path('api/current_user/', CurrentUserView.as_view(), name='current_user'),
    
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

