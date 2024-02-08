# from django.shortcuts import render

# # Create your views here.
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from django.contrib.auth import get_user_model
# from .serializers import CreateUserSerializer
# from .forms import CustomUserCreationForm

# User = get_user_model()

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_user(request):
#     if request.method == 'POST':
#         print(request.data)
#         serializer = CreateUserSerializer(data=request.data)
#         form = CustomUserCreationForm(request.data)

#         if serializer.is_valid() and form.is_valid():
#             validated_data = {
#                 'employeeid': request.data.get('employeeid'),
#                 'email': request.data.get('email'),
#                 'password': request.data.get('password'),
#                 'name': request.data.get('name'),
#                 'age': request.data.get('age'),
#                 'phone_number': request.data.get('phone_number'),
#                 'address': request.data.get('address'),
#             }
#             user = User.objects.create_user(**validated_data)
#             serializer.save()
#             return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
#         else:
#             errors = {
#                 'password': serializer.errors.get('password', []),
#                 're_password': serializer.errors.get('re_password', []),
#                 'name': form.errors.get('name', []),
#                 'employeeid': form.errors.get('employeeid', []),
#             }
#             errors.update(serializer.errors)
#             errors.update(form.errors)
#             return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken

# from .serializers import CreateUserSerializer
# from .models import User  # Replace with your actual user model

# class CustomUserCreateView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         serializer = CreateUserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             refresh = RefreshToken.for_user(user)
#             data = {
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }
#             return Response(data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
