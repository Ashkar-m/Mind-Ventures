from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from dotenv import load_dotenv
from . models import UserAccount

import os

from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True) 

    class Meta:
        model = UserAccount
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')

        if not password or not password2:
            raise serializers.ValidationError("Both password are required")

        if password != password2:
            raise serializers.ValidationError("Password do not match")
        
        return data
    
    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'],
            email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        
        data['user'] = user
        return data


class OTPVerificationSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    otp = serializers.CharField(required=True)

    def validate(self, data):
        if not self.verify_otp(data['username'], data['otp']):
            raise serializers.ValidationError('Invalid OTP.')
    
        return data

    def verify_otp(self, username, otp):

        return True


class OTPResendSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)

    def validate(self, data):
        if not self.resend_otp(data['username']):
            raise serializers.ValidationError("Unable to resend OTP.")
        
        return data

    def resend_otp(self, username):

        return True
    

class ForgotPaswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("user with this email doesn't exist")
        
        return data

    def send_reset_email(self, email):
            user = self.user
            # Generate password reset token
            token = default_token_generator.make_token(user)

            # create password reset link
            reset_link = f"{settings.FRONTEND_URL}/reset-password/{user.pk}/{token}/"

            # composing mail
            subject = "Password Reset Request"
            message = f"Hi {user.username},\n Use the link below to reset your password.{reset_link}\n If you did not request a password reset, you can ignore this email."
            load_dotenv()
            from_email = os.getenv('EMAIL_HOST_USER')
            recipiant_list = [email]

            # send email
            try:
                send_mail(subject, message, from_email, recipient_list)
                
                return True
            except Exception as e:
                print(f"Error sending email: {e}")

                return False
                
