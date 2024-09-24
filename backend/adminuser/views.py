from django.shortcuts import render
from rest_framework import generics

from users.models import UserAccount
from . serializers import UserDetailSerializers, MentorDetailSerialzer


class UserDetailView(generics.ListAPIView):
    queryset = UserAccount.objects.filter(role='student')
    serializer_class = UserDetailSerializers

class MentorDetailView(generics.ListAPIView):
    queryset = UserAccount.objects.filter(role='mentor')
    serializer_class = MentorDetailSerialzer