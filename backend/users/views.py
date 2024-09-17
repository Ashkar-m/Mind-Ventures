from django.shortcuts import render
from django.http import HttpResponse
from dotenv import load_dotenv
from django.core.mail import send_mail
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.cache import cache
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


import os
import random

from . serializers import OTPResendSerializer, RegisterSerializer
from . serializers import ForgotPaswordSerializer, LoginSerializer, OTPVerificationSerializer
# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
                user = serializer.validated_data['user']

                return Response({"message": "Login succefully"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OtpManger:
    def generate_otp():
        otp = random.randint(100000,999999)
        return str(otp)

    def send_otp(email, otp):
        subject = "Your OTP Code"
        message = f'You OTP code is {otp}. Please use this to verify your account.'
        load_dotenv()
        from_email = os.getenv('EMAIL_HOST_USER')

        send_mail(subject, message, from_email, [email], fail_silently=False)

    def store_otp(username, otp):
        cache.set(f'otp_{username}', otp, timeout=300)


@api_view(['POST'])
def send_otp(request):
    serializer = OTPResendSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validate_data['username']
        # create instance for class OtpManager
        otp_instance = OtpManger()
        otp = otp_instance.generate_otp()

        # get email of user
        print(request.email,'email')
        email = 'user@example.com'
        otp_instance.send_otp(email, otp)
        # store otp in cache
        otp_instance.store_otp(username, otp)
        
        return Response({'detail': 'OTP sent successfully.'}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_otp(request):
    serializer = OTPVerificationSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validate_data['username']
        otp = serializer.validate_data['otp']
        # Recieve otp from cache
        cached_otp = cache.get(f'otp_{username}')

        if cached_otp == otp:
            return Response({'detail': 'OTP verified scuccessfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def resend_otp(request):
    serializer = OTPResendSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validate_data['username']
        # create instance for class OtpManager
        otp_instance = OtpManger()
        otp = otp_instance.generate_otp()

        # get email of user
        print(request.POST.email,'email')
        email = 'user@example.com'
        otp_instance.send_otp(email, otp)
        # store otp in cache
        otp_instance.store_otp(username, otp)
        
        return Response({'detail': 'OTP resent successfully.'}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPaswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validate_data['email']
            if serializer.send_reset_email(email):
                return Response({"message": "Password reset email sent succefully"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Failed to sent the message"}, status=HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)