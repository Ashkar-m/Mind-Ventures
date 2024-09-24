from django.urls import path
from . import views

urlpatterns = [
    path('users-list/', views.UserDetailView.as_view(), name='users-list'),
    path('mentor-list/', views.MentorDetailView.as_view(), name='mentor-list'),
]