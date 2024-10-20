from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from . models import Category, Course, CourseVariant, Chapters
from . serializers import CategorySerializer, CourseSerializer, CourseVariantSerializer, ChapterSerializers


class CategoryListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

    def post(self, request):
        # Create a new category with the option of assigning a parent category
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            try:
               serializer.save()
               return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ToggleCategoryActiveView(APIView):
    def post(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({"Error": "Category not found."}, status=status.HTTP_404_NOT_FOUND)
        
        category.active = not category.active
        category.save()

        return Response({"succes": "Category toggled"}, status=status.HTTP_200_OK)


class CategoryDetailAPIView(APIView):

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return None
    
    def get(self, request, pk):
        category = self.get_object(pk)
        if category is None:
            return Response({"error":"Course not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = CategorySerializer(category)
            return Response(serializer.data)
    
    def put(self, request, pk):
        category = self.get_object(pk)
        if category is None:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        category = self.get_object(pk)
        if category is None:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
        
        category.delete()
        return Response({"message": "Course deleted "}, status=status.HTTP_204_NO_CONTENT)


class CourseAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        # Check the user's role
        if request.user.role == 'mentor':
            # For mentors, return only their courses
            courses = Course.objects.filter(mentor=request.user)
        elif request.user.role == 'admin':
            # Admin can see all courses
            courses = Course.objects.all()
        elif request.user.role == 'student':
            # Check if the student's is_verified field is True
            courses = Course.objects.filter(mentor__is_verified=True) | Course.objects.filter(mentor__role='admin')
            
        else:
            return Response({'error': 'User role not recognized.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        # Create a new request data dict including mentor_id
        data = request.data.copy()  # Create a copy of the request data
        print("Incoming data:", data)
        data['mentor_id'] = request.user.id  # Add the mentor_id field
        # Set active and status based on the user's role
        if request.user.role == 'mentor':
            data['active'] = False
            data['status'] = 'pending'
        elif request.user.role == 'admin':
            data['active'] = True
            data['status'] = 'approval'
        else:
            return Response({'error': 'User role not recognized.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = CourseSerializer(data=data)  # Use the modified data
        if serializer.is_valid():
            serializer.save(mentor=request.user)  # Save the mentor (user instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        try:
            course = Course.objects.get(pk=pk, mentor=request.user)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found or permission denied.'}, status=status.HTTP_404_NOT_FOUND)

        # Allow partial updates using 'partial=True'
        serializer = CourseSerializer(course, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseViewset(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(mentor=self.request.user)


class CourseDetailAPIView(APIView):

    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return None
    
    def get(self, request, pk):
        course = self.get_object(pk)
        if course is None:
            return Response({"error": "course not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CourseSerializer(course)
        return Response(serializer.data)


class CourseVariantAPIView(APIView):

    def get(self, request):
        course_variants = CourseVariant.objects.all()
        serializer = CourseVariantSerializer(course_variants, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseVariantSerializer(data.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseVariantDetailAPIView(APIView):

    def get_object(self, pk):
        try:
            return CourseVariant.objects.get(pk=pk)
        except CourseVariant.DoesNotExist:
            return None
    
    def get(self, request, pk):
        course_variant = self.get_object(pk)
        if course_variant is None:
            return Response({"error":"Couse variant not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = CourseVariantSerializer(course_variant)
            return Response(serializer.data)
    
    def put(self, request, pk):
        course_variant = self.get_object(pk)
        if course_variant is None:
            return Response({"error": "Course vaiant not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CourseVariantSerializer(course_variant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        course_variant = self.get_object(pk)
        if course_variant is None:
            return Response({"error": "Course variant not found"}, status=status.HTTP_404_NOT_FOUND)
        
        course_variant.delete()
        return Response({"message": "Course variant deleted "}, status=status.HTTP_204_NO_CONTENT)


class ChapterAPIView(APIView):

    def get(self, request):
        chapter = Chapter.objects.all()
        serializer = ChapterSerializers(chapter, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ChapterSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChapterDetailAPIView(APIView):

    def get_object(self, pk):
        try:
            return Chapter.objects.get(pk=pk)
        except Chapter.DoesNotExist:
            return None
    
    def get(self, request, pk):
        chapter = self.get_object(pk)
        if chapter is None:
            return Response({"error": "Chapter not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ChapterSerializers(chapter)
        return Response(serializer.data)
    
    def put(self, request, pk):
        chapter = self.get_object(pk)
        if chapter is None:
            return Response({"error": "Chapter not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ChapterSerializers(chapter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        chapter = self.get_object(pk)
        if chapter is None:
            return Response({"error": "Chapter not found"}, status=status.HTTP_404_NOT_FOUND)
        
        chapter.delete()
        return Response({"message": "Chapter deleted"}, status=status.HTTP_204_NO_CONTENT)

