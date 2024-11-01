from rest_framework import serializers

from .models import OrderTransaction, OrderCourse, Order

class OrderTransactionSerializer(serializers.ModelSerializer):
    order_date =  serializers.DateTimeField(format='%d %B %Y %I:%M %p')

    class Meta:
        model = OrderTransaction
        fields = '__all_'
        depth = 2

class OrderItemSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_price = serializers.DecimalField(source='course.price', max_digits=10, decimal_places=2, read_only=True)
    course_image = serializers.ImageField(source='course.preview_image', read_only=True)

    class Meta:
        model = OrderCourse
        fields = ['id', 'course', 'price', 'cretated_at', 'course_title', 'course_price', 'course_image'] 

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'order_status', 'user', 'created_at', 'updated_at', 'order_items', 'total_price']
        read_only_fields = ['user', 'created_at', 'updated_at', 'total_price']
