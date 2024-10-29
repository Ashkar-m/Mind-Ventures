from rest_framework import serializers

from .models import OrderTransaction

class OrderTransactionSerializer(serializers.ModelSerializer):
    order_date =  serializers.DateTimeField(format='%d %B %Y %I:%M %p')

    class Meta:
        model = OrderTransaction
        fields = '__all_'
        depth = 2