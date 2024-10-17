from django.shortcuts import render
from django.http import HttpResponse
from dotenv import load_dotenv
from django.core.mail import send_mail
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

import os
import random

from . models import UserAccount, StudentProfile, MentorProfile
from .serializers import (
    CustomTokenObtainPairSerializer,
    OTPResendSerializer,
    RegisterSerializer,
    OTPSendSerializer,
    ForgotPaswordSerializer,
    LoginSerializer,
    OTPVerificationSerializer,
    UserAccountSerializer,
    StudentProfileSerializer,
    MentorProfileSerializer,
)
# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

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


@api_view(['GET'])
def get_user_details(request, id):
    try:
        user = UserAccount.objects.get(pk=id)
    except UserAccount.DoesNotExist:
        return Response({ 'error' : 'User not found' }, status=status.HTTP_404_NOT_FOUND)
    serializer = UserAccountSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


class OtpManger:
    def generate_otp(self):
        otp = random.randint(100000,999999)
        return str(otp)

    def send_otp(self, email, otp):
        subject = "Your OTP Code"
        message = f'You OTP code is {otp}. Please use this to verify your account.'
        from_email = os.getenv('EMAIL_HOST_USER')

        send_mail(subject, message, from_email, [email], fail_silently=False)

    def store_otp(self, email, otp):
        cache.set(f'otp_{email}', otp, timeout=300)
        print(f'OTP {otp} stored for email: {email},  otp_{email}')


@api_view(['POST'])
def send_otp(request):
    serializer = OTPSendSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        # create instance for class OtpManager
        otp_instance = OtpManger()
        otp = otp_instance.generate_otp()

        # sending otp with the given email
        otp_instance.send_otp(email, otp)
        # store otp in cache
        otp_instance.store_otp(email, otp)
        
        return Response({'detail': 'OTP sent successfully.'}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_otp(request):
    serializer = OTPVerificationSerializer(data=request.data)
    otp = type(request.data.get('otp'))
    email= request.data.get('email')
    if serializer.is_valid():
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        user.is_verified = True
        user.save()
       
        return Response({'detail': 'OTP verified scuccessfully.'}, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
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
        

class UserProfileView(APIView):
    def get(self, request, pk, *args, **kwargs):
        try:
            user = UserAccount.objects.get(pk=pk)
        except UserAccount.DoesNotExist:
            return Response({"Error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if hasattr(user, 'studentprofile'):
            serializer = StudentProfileSerializer(user.studentprofile, context={'request': request})
        elif hasattr(user, 'mentorprofile'):
            serializer = StudentProfileSerializer(user.mentorprofile, context={'request': request})
        else:
            return Response({ "detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        serializer = StudentProfileSerializer(data=request.data, context={'request': request})
        permission_classes = [IsAuthenticated]
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        user = request.user
        if hasattr(user, 'studentprofile'):
            profile_instance = user.studentprofile
        elif hasattr(user, 'mentorprofile'):
            profile_instance = user.mentorprofile
        else:
            return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = StudentProfileSerializer(profile_instance, data=request.data, partial=True)
        permission_classes = [IsAuthenticated]
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class StudentProfileUpdateView(generics.UpdateAPIView):
#     queryset = UserAccount.objects.all()
#     serializer_class = StudentProfile
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # Customize queryset to update the profile of the logged-in user only
#         user = self.request.user
#         return StudentProfile.objects.filter(user=user)

@api_view(['PATCH'])
def update_mentor_profile(request, pk):
    try:
        # Retrieve the user object using the primary key (pk)
        mentor = UserAccount.objects.get(pk=pk)

        # Update mentor profile with the data from request
        serializer = MentorProfileSerializer(mentor, data=request.data, partial=True)  # Use partial=True for partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except UserAccount.DoesNotExist:
        return Response({'error': 'Mentor not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def update_student_profile(request, pk):
    try:
        # Retrieve the user object using the primary key (pk)
        student = UserAccount.objects.get(pk=pk)

        # Update mentor profile with the data from request
        serializer = StudentProfileSerializer(student, data=request.data, partial=True)  # Use partial=True for partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except UserAccount.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)