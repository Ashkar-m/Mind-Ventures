
from django.urls import path
from .views import ChatHistoryView

urlpatterns = [
    path("chat-history/", ChatHistoryView.as_view(), name="chat-history"),
]
