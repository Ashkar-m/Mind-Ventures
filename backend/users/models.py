from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
    
# Create your models here.

class UserAccountManager(BaseUserManager):
    """
    Is a manager class for creating and generating users 
    and the admin users with given email and password
    """

    def generate_username(self, email):
        # Generate unique username from email
        username_base = slugify(email.split("@")[0])
        username = username_base
        counter = 1

        while self.model.objects.filter(username=username).exists():
            username = f"{username_base}_{counter}"
            counter += 1
        
        return username

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("User must need an email address"))
        
        email = self.normalize_email(email)
        username = extra_fields.get("username")
        
        if not username:
            username = self.generate_username(email)
        
        user=self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("is_superuser",True)
        extra_fields.setdefault("is_active",True)
        # Add role to admin
        extra_fields.setdefault("role",UserAccount.ADMIN)

        if not extra_fields.get("is_staff"):
            raise ValueError("Superuser must be is_staff True")
        
        if not extra_fields.get("is_superuser"):
            raise ValueError("Superuser must be is_superuser True")
        
        if extra_fields.get("role") != UserAccount.ADMIN:
            raise ValueError("Superuser role must be Admin")
        
        return self.create_user(email, password, **extra_fields)

class UserAccount(AbstractUser):
    """
    user model with id and role based differentiation
    """

    # Three type of users
    STUDENT = 'student'
    MENTOR = 'mentor'
    ADMIN = 'admin'

    role_choices = [(STUDENT,'Student'),(MENTOR,'Mentor'),(ADMIN,'Admin')]
    role = models.CharField(max_length=10, choices=role_choices)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    username = models.CharField(max_length=100,blank=True,unique=True)
    email = models.EmailField(_('email address'),unique=True)
    phone_number = PhoneNumberField(blank=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    # Link the custom user manager
    objects = UserAccountManager()

    def __str__(self):
        return f"{self.username}"