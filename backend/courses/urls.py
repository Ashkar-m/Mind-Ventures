from django.urls import path,include
from . import views
from django.conf import settings
from rest_framework.routers import DefaultRouter
from .views import CourseViewset
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'courseview', CourseViewset, basename='courseview') 

urlpatterns = [
    path('', include(router.urls)),
    path('category-list/', views.CategoryListView.as_view(), name='category-list'),
    path('category/toggle-status/<int:pk>/', views.ToggleCategoryActiveView.as_view(), name='category-toggle'),
    path('course-list/', views.CourseAPIView.as_view(), name='course-list'),
    path('course-detail/<int:pk>/', views.CourseDetailAPIView.as_view(), name='course-detail'),
    path('variant-list/', views.CourseVariantAPIView.as_view(), name='variant-list'),
    path('variant-detail/<int:pk>/', views.CourseVariantDetailAPIView.as_view(), name='variant-detail'),
    path('chapter-list/', views.ChapterAPIView.as_view(), name='chapter-list'),
    path('chapter-detail/<int:pk>/', views.ChapterDetailAPIView.as_view(), name='chapter-detail')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)