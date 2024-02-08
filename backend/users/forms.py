from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ["name", "employeeid", "gender", "email", "phone_number", "age", "address", "password1", "password2"]
        error_class = "error"

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = ["name", "employeeid", "gender", "email", "phone_number", "age", "address"]
        error_class = "error"