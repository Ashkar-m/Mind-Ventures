from django.contrib import admin

from .models import (
    Order,
    OrderCourse,
    OrderTransaction
)

admin.site.register(OrderTransaction)
admin.site.register(Order)
admin.site.register(OrderCourse) 


