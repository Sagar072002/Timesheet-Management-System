from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    employeeid = models.CharField(max_length=255, unique=True)
    gender = models.CharField(max_length=10, choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")])
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=12)
    age = models.IntegerField()
    address = models.TextField()
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'employeeid'
    REQUIRED_FIELDS = ['name', 'gender', 'email', 'phone_number', 'age', 'address']


    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return f"{self.name}"
