from django.db import models
from django.contrib.auth import get_user_model

from courses.models import Course

User = get_user_model()

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled','Cancelled')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    order_status = models.CharField(max_length=20,
        choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_amount(self):
        return sum(item.price for item in self.order_courses.all())

    def __str__(self):
        return f"Order {self.id} by {self.user.username}" 

class OrderCourse(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_courses")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="order_courses")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def  __str__(self):
        return f"Course '{self.course.title}' in Order-{self.order.id} by {self.order.user.username}"



class OrderTransaction(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="transactions")
    order_amount = models.DecimalField(max_digits=20, decimal_places=2)
    order_payment_id = models.CharField(max_length=100, unique=True)
    isPaid = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Transaction for {self.order_product} - Payment ID: {self.order_payment_id}"