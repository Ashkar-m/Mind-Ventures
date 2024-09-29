from django.urls import path
from . import views

urlpatterns = [
    path('category-list/', views.CategoryListView.as_view(), name='category-list'),
    path('course-list/', views.CourseAPIView.as_view(), name='course-list'),
    path('course-detail/<int:pk>/', views.CourseDetailAPIView.as_view(), name='course-detail'),
    path('variant-list/', views.CourseVariantAPIView.as_view(), name='variant-list'),
    path('variant-detail/<int:pk>/', views.CourseVariantDetailAPIView.as_view(), name='variant-detail'),
    path('chapter-list/', views.ChapterAPIView.as_view(), name='chapter-list'),
    path('chapter-detail/<int:pk>/', views.ChapterDetailAPIView.as_view(), name='chapter-detail')
]