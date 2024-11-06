# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from django.contrib.auth import get_user_model
# from .models import ChatMessage

# User = get_user_model()

# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.user = self.scope["user"]
#         self.room_name = f"chat_{self.user.id}"
#         self.room_group_name = f"chat_{self.user.id}"

#         if self.user.is_authenticated:
#             await self.channel_layer.group_add(self.room_group_name, self.channel_name)
#             await self.accept()
#         else:
#             await self.close()
    
#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    
#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         message = data["message"]
#         reciever_id = data["reciever_id"]

#         receiver = User.objects.get(id=reciever_id)
#         chat_message = ChatMessage.objects.create(sender=self.user, receiver=receiver, content=message)

#         await self.channel_layer.group_send(
#             f"chat_{reciever_id}",
#             {
#                 "type": "chat_message",
#                 "message": message,
#                 "sender_id": self.user.id,
#             },
#         )
    
#     async def chat_message(self, event):
#         message = event["message"]
#         sender_id = event["sender_id"]

#         await self.send(text_data=json.dumps({
#             "message": message,
#             "sender_id": sender_id,
#         }))

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from .models import ChatMessage

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.room_name = f"chat_{self.user.id}"
        self.room_group_name = f"chat_{self.user.id}"

        if self.user.is_authenticated:
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
        else:
            await self.close()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get("message")
        reciever_id = data.get("reciever_id")

        try:
            receiver = User.objects.get(id=reciever_id)
            chat_message = ChatMessage.objects.create(sender=self.user, receiver=receiver, content=message)
            
            await self.channel_layer.group_send(
                f"chat_{reciever_id}",
                {
                    "type": "chat_message",
                    "message": message,
                    "sender_id": self.user.id,
                },
            )
        except User.DoesNotExist:
            # Log error or handle it as needed
            pass
    
    async def chat_message(self, event):
        message = event["message"]
        sender_id = event["sender_id"]

        await self.send(text_data=json.dumps({
            "message": message,
            "sender_id": sender_id,
        }))
