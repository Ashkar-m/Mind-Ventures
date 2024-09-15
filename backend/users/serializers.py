from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True) 

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidatationError("Password do not match")
        
        return data
    
    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'],
            email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidatationError("Invalid credentials.")

        return data


class OTPVerificationSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    otp = serializers.CharField(required=True)

    def validate(self, data):
        if not self.verify_otp(data['username'], data['otp']):
            raise serializers.ValidatationError('Invalid OTP.')
    
        return data

    def verify_otp(self, username, otp):

        return True


class OTPResendSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)

    def validate(self, data):
        if not self.resend_otp(data['username']):
            raise serializers.ValidatationError("Unable to resend OTP.")
        
        return data

    def resend_otp(self, username):

        return True
    

class ForgotPaswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidatationError("user with this email doesn't exist")
        
        return data

    def send_reset_email(self, email):

        return True
