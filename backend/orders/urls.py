from django.urls import path

from .views import (
    start_payment,
    handle_payment_success,
    checkout_cart
)

urlpatterns = [
    path('checkout/', checkout_cart, name='checkout_cart' ),
    path('pay/', start_payment, name='payment'),
    path('payment/success/', handle_payment_success, name='payment_success'),
]