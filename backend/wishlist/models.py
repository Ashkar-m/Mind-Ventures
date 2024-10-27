from django.db import models
from  django.contrib.auth import get_user_model

from courses.models import Course

User = get_user_model()


class Wishlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Wishlist of {self.user.username}"

    @property
    def total_price(self):
        return sum(item.price for item in self.items.filter(is_active=True))


class  WishlistItem(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='items')
    course  = models.ForeignKey(Course, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['wishlist', 'course'], name='unique_wishlist_item')
        ]
    def __str__(self):
        return f"Wishlist item of {self.course.title} in wishlist of {self.wishlist.user.username}"

