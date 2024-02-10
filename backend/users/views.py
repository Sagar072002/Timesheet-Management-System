from django.shortcuts import render
from rest_framework import generics
from .models import User
from .managers import CustomUserManager
from .serializers import CreateUserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

#fetch data
@api_view(['GET'])
def getUser(request, employeeid):
    user = User.objects.get(employeeid=employeeid)
    serializer = CreateUserSerializer(user, many=False)
    return Response(serializer.data)

#fetch all data
@api_view(['GET'])
def getUserAll(request):
    users = User.objects.all()
    serializer = CreateUserSerializer(users, many=True)
    return Response(serializer.data)

#update data
@api_view(['PUT'])
def updateUser(request, employeeid):
    user = User.objects.get(employeeid=employeeid)
    serializer = CreateUserSerializer(user, data=request.data)
    if serializer.is_valid():
        if request.data.get('name'):
            user.name = request.data['name']
        if request.data.get('gender'):
            user.gender = request.data['gender']
        if request.data.get('email'):
            CustomUserManager.email_validator(user,request.data['email'])
            user.email = request.data['email']
        if request.data.get('phone_number'):
            user.phone_number = request.data['phone_number']
        if request.data.get('age'):
            user.age = request.data['age']
        if request.data.get('address'):
            user.address = request.data['address']        
        password = request.data.get('password')
        if password:
            print(f"Password before hashing: {password}")
            user.set_password(password)
            print(f"Password after hashing: {user.password}")
        user.save()
        #print(f"User updated successfully: {serializer.data}")
        return Response(serializer.data)
    
    else:
        print(f"Validation errors: {serializer.errors}")
        return Response(serializer.errors, status=400)
