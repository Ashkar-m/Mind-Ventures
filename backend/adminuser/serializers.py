from rest_framework import serializers
from users.models import UserAccount, MentorProfile


class UserDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'email', 'username', 'is_verified', 'phone_number','is_active']


class MentorDetailSerialzer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'email', 'phone_number', 'username', 'is_verified']

class MentorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = '__all__'