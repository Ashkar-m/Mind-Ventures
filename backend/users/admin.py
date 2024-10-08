from django.contrib import admin
from . models import (
    UserAccount,
    StudentProfile,
    MentorProfile
)

# Register your models here.

admin.site.register(UserAccount)
admin.site.register(StudentProfile)
admin.site.register(MentorProfile)