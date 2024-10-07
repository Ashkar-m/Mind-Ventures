from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . models import Category, Course, CourseVariant, Chapters
from . serializers import CategorySerializer, CourseSerializer, CourseVariantSerializer, ChapterSerializers


class CategoryListView(APIView):
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

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

