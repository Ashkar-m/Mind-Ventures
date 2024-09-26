from django.db import models
from decimal import Decimal
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, FileExtensionValidator


User = get_user_model()


class Category(models.Model):
    # Course category with self foreing key relation.

    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        relation_name='subcategories'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def get_full_path(self):
        # Recursively get the full path of category.
        if self.parent:
            return f"{self.parent.get_full_path()} > {self.name}"
        return self.name


class Course(models.Model):
    status_choices = [
        ("pending", "Pending"),
        ("approval", "Approval"),
        ("rejected", "Rejected")
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    preview_image = models.ImageField(
        upload_to='course_preview/',
        blank=True,
        null=True,
    )
    # Mentor submission of the course
    mentor = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=status_choices, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Chapters(models.Model):
    # Model for each chapters
    course = models.ForeignKey(Course, on_delete=models.CASCADE, relation_name="chapters")
    title = models.CharField(max_length=255)
    content = models.TextField()
    video_file = models.FileField(
        upload_to='videos/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(["mp4"])],
    )
    # For order of each chapters
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
        