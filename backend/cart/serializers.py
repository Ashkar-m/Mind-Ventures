from rest_framework import serializers
from .models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_price = serializers.DecimalField(source='course.price', max_digits=10, decimal_places=2, read_only=True)
    course_image = serializers.ImageField(source='course.preview_image', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'course', 'price', 'is_active', 'added_at', 'course_title', 'course_price', 'course_image'] 

class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'updated_at', 'cart_items', 'total_price']
        read_only_fields = ['user', 'created_at', 'updated_at', 'total_price']
