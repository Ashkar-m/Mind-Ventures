from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
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
        cart, created = Cart.objects.get_or_create(user=request.user)
        course_id = request.data.get('course')
        price = request.data.get('price')

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            course_id=course_id,
            defaults={'price': price}
        )

        if not created:
            return Response({'detail': 'Item already exists in the cart.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, cart=cart, id=item_id)
        
        cart_item.delete()
        return Response({"detail": "Item removed from cart."}, status=status.HTTP_204_NO_CONTENT)
