from django import forms
from .models import Marker
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

class MarkerForm(forms.ModelForm):
    class Meta:
        model = Marker
        fields = ('name', 'latitude', 'longitude', 'is_active', 'photo')

class SignUpForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ('username', 'password1', 'password2')