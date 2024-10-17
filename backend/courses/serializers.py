from rest_framework import serializers

from . models import Category, Chapters, CourseVariant, Course

class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.StringRelatedField(many=True, read_only=True)
    full_path = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent', 'subcategories', 'full_path','active']


    def get_full_path(self, obj):
        return obj.get_full_path()

    def validate_parent(self, value):
        # Ensure a category cannot be its own parent.
        if self.instance and value == self.instance:
            raise serializer.ValidationError("A category cannot be its own parent")
        return value

        
class CourseSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    mentor = serializers.ReadOnlyField(source='creator.username')
    mentor_id = serializers.ReadOnlyField(source='mentor.id')
    preview_image = serializers.ImageField(required=False)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'category', 'mentor', 'mentor_id', 'status', 'preview_image',
         'created_at', 'price', 'duration', 'updated_at']

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


