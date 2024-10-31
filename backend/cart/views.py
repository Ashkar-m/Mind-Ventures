from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from courses.models import Course
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from django.shortcuts import get_object_or_404

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # cart, created = Cart.objects.get_or_create(user=request.user)
        course_id = request.data.get('course_id')
        # price = request.data.get('price')
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        cart, created = Cart.objects.get_or_create(user=request.user)
        cart_item , created = CartItem.objects.get_or_create(cart=cart, course=course, price=course.price)

        if not created:
             return Response({"message": "Course already in cart"}, status=status.HTTP_200_OK)

        return Response({"message": "Course added to wishlist"}, status=status.HTTP_201_CREATED)

    def patch(self, request, item_id):
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, cart=cart, id=item_id)

        is_active = request.data.get('is_active')
        if is_active is not None:
            cart_item.is_active = is_active
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, item_id):
        # cart = get_object_or_404(Cart, user=request.user)
        # cart_item = get_object_or_404(CartItem, cart=cart, id=item_id)
        
        # cart_item.delete()
        # return Response({"detail": "Item removed from cart."}, status=status.HTTP_204_NO_CONTENT)

        try:
            cart_item = CartItem.objects.get(cart__user=request.user, course__id=item_id)
            cart_item.delete()
            return Response({"message": "Course removed from Cart"}, status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"error": "Course not found in Cart"}, status=status.HTTP_404_NOT_FOUND)

