from django.urls import path
from .views import WishlistView, WishlistItemDetailView

urlpatterns = [
    path('wishlist/', WishlistView.as_view(), name='get_add_wishlist'),
    path('wishlist/<int:course_id>/', WishlistItemDetailView.as_view(), name='remove_from_wishlist'),
]
