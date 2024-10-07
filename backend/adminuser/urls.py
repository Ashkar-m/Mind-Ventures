from django.urls import path
from . import views

urlpatterns = [
    path('users-list/', views.UserDetailView.as_view(), name='users-list'),
    path('users/toggle-status/<int:pk>/', views.ToggleUserStatusView.as_view(), name='user-toggle-status'),
    path('mentor-list/', views.MentorDetailView.as_view(), name='mentor-list'),
    path('mentors/toggle-status/<int:pk>/', views.ToggleMentorStatusView.as_view(), name='mentor-toggle-status'),
    
]