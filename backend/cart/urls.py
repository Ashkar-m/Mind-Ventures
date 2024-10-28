from django.urls import path
from .views import CartView, CartItemView

urlpatterns = [
    path('', CartView.as_view(), name='cart-detail'),
    path('item/', CartItemView.as_view(), name='cart-item-add'),
    path('item/<int:item_id>/', CartItemView.as_view(), name='cart-item-update-delete'),
]
