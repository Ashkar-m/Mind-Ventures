from rest_framework import GENDER_CHOICES
from django.cotrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

from .models import ChatMessage
from .serializers import ChatMessageSerializer


class ChatHistoryView(generics.ListAPIView):
    serilizer_class = ChatMessageSerializer
    permission_class = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        reciever_id = self.request.query_params.get("reciever_id")
        return ChatMessage.objects.filter(sender=user, reciever_id=reciever_id) 
            | ChatMessage.objects.filter(sender_id=reciever_id
                receiver=user).order_by("timestamp")
