from django.contrib import admin

from .models import Course, Category, CourseVariant, Chapters
# Register your models here.

admin.site.register(Course)
admin.site.register(Category)
admin.site.register(CourseVariant)
admin.site.register(Chapters)