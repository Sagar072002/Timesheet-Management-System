# from django.urls import path
# from .views import CustomUserCreateView

# urlpatterns = [
#     # Add your existing URL patterns here
#     path('api/v1/auth/users/', CustomUserCreateView.as_view(), name='user-create'),
#     # Add other URL patterns as needed
# ]

from django.urls import path
from . import views

urlpatterns = [
    path('get/<str:employeeid>/', views.getUser, name='get_user'),
    path('getall/', views.getUserAll, name='get_user_all'),
    path('update/<str:employeeid>/', views.updateUser, name='update_user'),
    # Add other paths for create, update, delete as needed
    # path('create/', views.addUser, name='create_user'),
    # path('update/<str:employeeid>/', views.updateUser, name='update_user'),
    # path('delete/<str:employeeid>/', views.deleteUser, name='delete_user'),
]