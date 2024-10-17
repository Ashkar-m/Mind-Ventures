from django.urls import path
from . import views
from rest_framework_simplejwt.views import(
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('user-detail/<int:id>/', views.get_user_details, name='user-detail'),
    path('send-otp/', views.send_otp, name='send-otp'),
    path('resend-otp/', views.resend_otp, name='resend-otp'),
    path('verify-otp/', views.verify_otp, name='verify-otp'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('forgot-password/', views.ForgotPasswordView.as_view(), name='forgot-password'),
    # path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair-view'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh-view'),
    path('token-view/', views.CustomTokenObtainPairView.as_view(), name='token-view'),
    path('user-profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('user-profile/<int:pk>/', views.UserProfileView.as_view(), name='user-profile-detail'),
    path('student-profile/update/', views.update_student_profile, name='student-profile-update'),
    path('mentor-profile/<int:pk>/update/', views.update_mentor_profile, name='mentor-profile-update'),
]