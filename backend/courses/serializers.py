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
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_id = serializers.ReadOnlyField(source='category.id')
    mentor = serializers.ReadOnlyField(source='mentor.username')
    mentor_role = serializers.ReadOnlyField(source='mentor.role')
    mentor_id = serializers.ReadOnlyField(source='mentor.id')
    preview_image = serializers.ImageField(required=False)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'category', 'mentor', 'mentor_id', 'status', 'preview_image',
         'created_at', 'category_id', 'price', 'duration', 'updated_at','mentor_role','active']

    def create(self, validated_data):
        # Extract the category from validated data (which is an ID)
        category = validated_data.pop('category')
        
        # Create the course with the extracted category
        course = Course.objects.create(category=category, **validated_data)
        
        return course

    def to_representation(self, instance):
        # Modify the representation to show the category name instead of the ID
        response = super().to_representation(instance)
        
        # Check if category exists to avoid 'NoneType' object error
        if instance.category:
            response['category'] = instance.category.name  # Replace category ID with its name
        else:
            response['category'] = None  # If no category, set it to None or handle appropriately
        
        return response

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


