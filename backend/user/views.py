from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .serializers import AuthUserSerializer

from .models import CustomUser

class UserCreateAPIView(CreateAPIView):
  serializer_class = AuthUserSerializer
