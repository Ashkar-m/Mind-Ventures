from django.urls import path

from .views import (
    start_payment,
    handle_payment_success,
    checkout_cart,
    OrderView,
    OrderItemView
)

urlpatterns = [
    path('checkout/', checkout_cart, name='checkout_cart' ),
    path('pay/', start_payment, name='payment'),
    path('payment/success/', handle_payment_success, name='payment_success'),
    path('order/', OrderView.as_view(), name='order'),
    path('order/<int:item_id>/', OrderItemView.as_view(), name='order-item'),
]