from rest_framework import serializers
from . models import Wishlist, WishlistItem
from courses.models import Course

class WishlistItemSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_price = serializers.DecimalField(source='price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = WishlistItem
        fields = ['id', 'course', 'course_title', 'course_price', 'is_active', 'added_at']


class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Wishlist
        fields = ['user', 'created_at', 'updated_at', 'items', 'total_price']