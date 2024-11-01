from django.shortcuts import render
import json
import razorpay

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import OrderTransaction, Order, OrderCourse
from .serializers import OrderTransactionSerializer, OrderSerializer, OrderItemSerializer
from cart.models import Cart


@api_view(['POST'])
def checkout_cart(request):
    try:
        user = request.user
        cart = Cart.objects.get(user=user)

        order = Order.objects.create(user=user, order_status='pending')

        for item in cart.cart_items.filter(is_active=True):
            OrderCourse.objects.create(
                order=order,
                course=item.course,
                price=item.price
            )
            item.delete()
        return Response({"message": "Checkout successful", "order_id": order.id}, status=status.HTTP_201_CREATED)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def start_payment(request):
    amount = request.data['amount']
    # name = request.data['name']

    client = razorpay.Client(auth=(settings.RAZORPAY_PUBLIC_KEY, settings.RAZORPAY_SECRET_KEY))
    try:
        payment = client.order.create({
            "amount" : int(amount) * 100,
            "currency" : "INR",
            "payment_capture" : "1"
        })

        order = OrderTransaction.objects.create(
            order_amount=amount,
            order_payment_id=payment['id'],
            isPaid=False
        )
        serializer = OrderTransactionSerializer(order)

        data = {
            "payment": payment,
            "order": serializer.data
        }
        return Response(data, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['POST'])
def handle_payment_success(request):
    try:
        res = json.loads(request.data['response'])
        ord_id = res.get('razorpay_order_id')
        raz_pay_id = res.get('razorpay_payment_id')
        raz_signature = res.get('razorpay_signature')
    except (KeyError, json.JSONDecodeError) as e:
        return Response({"error": "Invalid payment data recieved"}, status=400)
    
    try:
        order = OrderTransaction.objects.get(order_payment_id=ord_id)
    except OrderTransaction.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    client = razorpay.Client(auth=(settings.RAZORPAY_PUBLIC_KEY, settings.RAZORPAY_SECRET_KEY))

    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    try:
        client.utility.verify_payment_signature(data)
    except razorpay.errors.SignatureVerificatioError:
        return Response({"error": "Payment verification failed"}, status=400)
    
    order.isPaid = True
    order.save()

    return Response({"message": "payment successfullly recieved"}, status=200)


class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        order, created = Order.objects.get_or_create(user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

class OrderItemView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):

        try:
            order_item = OrderCourse.objects.get(order__user=request.user, course__id=item_id)
            order_item.delete()
            return Response({"message": "Course removed from Order"}, status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"error": "Course not found in Orders"}, status=status.HTTP_404_NOT_FOUND)

