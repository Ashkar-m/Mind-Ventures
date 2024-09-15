from django.urls import path
from . import views

urlpatterns = [
    path('send_otp/',views.send_otp,name='send_otp'),
    path('resend_otp/',views.resend_otp,name='resend_otp'),
    path('verify_otp/',views.verify_otp,name='verify_otp')
]