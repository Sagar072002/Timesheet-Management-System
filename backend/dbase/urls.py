from django.urls import path
from . import views
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
urlpatterns=[
    # path('login/',views.login),
    # path('token/verify', jwt_views.TokenVerifyView.as_view(), name='token_verify_pair'),
    path('token/register/',views.register_user,name='token_new_pair'),
    path('token/login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/',views.ver,name='token_verify_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

]