# """
# ASGI config for backend project.

# It exposes the ASGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
# """

# import os

# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from chat.routing import websocket_urlpatterns

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket":AuthMiddlewareStack(
#         URLRouter(
#             websocket_urlpatterns
#         )
#     )
# })


import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.layers import get_channel_layer
from chat.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})

# Define the channel layer explicitly if not already done in settings
channel_layer = get_channel_layer()
