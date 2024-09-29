from rest_framework import serializers

from . models import Category, Chapters, CourseVariant, Course

class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent', 'subcategories', 'created_at', 'updated_at']

    def get_subcategories(self, obj):
        subcategories = obj.subcategories.all()
        return CategorySerializer(subcategories, many=True).data
    
    def validate_parent(self, value):
        # Ensure a category cannot be its own parent.
        if self.instance and value == self.instance:
            raise serializer.ValidationError("A category cannot be its own parent")
        return value

        
class CourseSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    mentor = serializers.StringRelatedField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'category', 'mentor', 'status', 'preview_image', 'created_at', 'updated_at']

class CourseVariantSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField()

    class Meta:
        model = CourseVariant
        fields = ['id', 'course', 'variant_name', 'price', 'created_at', 'updated_at']


class ChapterSerializers(serializers.ModelSerializer):
    course = serializers.StringRelatedField()

    class Meta:
        model = Chapters
        fields = ['id', 'title', 'content', 'video_file', 'order', 'course', 'created_at', 'updated_at']


