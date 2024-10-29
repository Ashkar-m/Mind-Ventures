from django.shortcuts import render
import JSONParser
import environ
import razorpay

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import OrderTransaction
from .serializers import OrderTransactionSerializer

env=environ.Env()


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
            order_payment_id=payment['id']
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