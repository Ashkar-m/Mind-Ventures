from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Wishlist, WishlistItem
from courses.models import Course
from .serializers import WishlistSerializer, WishlistItemSerializer

class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
        
        filtered_items = wishlist.items.filter(
            course__status="approval",
            course__mentor__is_verified=True
        )
        print(filtered_items)
        serializer = WishlistSerializer(wishlist, context={'items': filtered_items})
        return Response(serializer.data)

    def post(self, request):
        course_id = request.data.get('course_id')
        print(course_id)
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
        wishlist_item, created = WishlistItem.objects.get_or_create(wishlist=wishlist, course=course, price=course.price)

        if not created:
            return Response({"message": "Course already in wishlist"}, status=status.HTTP_200_OK)

        return Response({"message": "Course added to wishlist"}, status=status.HTTP_201_CREATED)

class WishlistItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, course_id):
        try:
            wishlist_item = WishlistItem.objects.get(wishlist__user=request.user, course__id=course_id)
            wishlist_item.delete()
            return Response({"message": "Course removed from wishlist"}, status=status.HTTP_204_NO_CONTENT)
        except WishlistItem.DoesNotExist:
            return Response({"error": "Course not found in wishlist"}, status=status.HTTP_404_NOT_FOUND)
