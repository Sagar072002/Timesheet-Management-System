from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import CreateUserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

#fetch data
@api_view(['GET'])
def getUser(request, employeeid):
    user = User.objects.get(employeeid=employeeid)
    serializer = CreateUserSerializer(user, many=False)
    return Response(serializer.data)

#update data
@api_view(['PUT'])
def updateUser(request, employeeid):
    user = User.objects.get(employeeid=employeeid)
    serializer = CreateUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        print(f"User updated successfully: {serializer.data}")
        return Response(serializer.data)
    else:
        print(f"Validation errors: {serializer.errors}")
        return Response(serializer.errors, status=400)
