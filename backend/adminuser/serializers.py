from rest_framework import serializers
from users.models import UserAccount


class UserDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'email', 'username', 'is_active', 'phone_number']


class MentorDetailSerialzer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'email', 'first_name', 'last_name', 'is_verified']