from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json




import jwt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth.forms import UserCreationForm


from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.
@csrf_exempt
def login(request):
    print(request.method)
    print(request.body)
    if(request.method=='POST'):
        # print(request.body)
        data =json.loads(request.body.decode('utf-8'))
        # print(data['email'])
        # print(data['pass'])
        
        print(type(data['email']))
        print(type(data['pass']))
        if(data['email']=="123@gmail.com" and data['pass']=="123" ):
            d={ 'auth': "true", 'msg': "Sucessful" }
            return JsonResponse(d)
        else:
            print(data['email']=="123@gmail.com")
            print(data['email'] )
            d={ 'auth': "false", 'msg': "Invalid Credentials" }
            return JsonResponse(d)
            
    else:
        d={ 'auth': "false", 'msg': "Invalid API Call" }
        return JsonResponse(d)
        
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        
        form = UserCreationForm(request.data)
        if form.is_valid():
            form.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response({'message': 'User registration failed', 'errors': form.errors}, status=status.HTTP_400_BAD_REQUEST)    
    
@api_view(['GET'])
@permission_classes([AllowAny])
def ver(request):
    user=request.user
    print(user)
    try:
        # request.META.get()
        print(10)
        r_t=request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        # print(jwt.decode(r_t,cond))
        j=JWTAuthentication()
        r=j.authenticate(request)
        if(j.authenticate(request)):
            print(10)
            print("r0",r[0])
            print("r1",r[1])
            print(len(r))
            print(r)
        # dc=AccessToken().verify_token_type()
        # print(dc)
        # c=dc.payload
        # ui=c.get('user_id')
        # print(ui)
            print(user)
            return Response({'message': 'User Verification successfully','auth':'true'})
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)   