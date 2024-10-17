from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models.signals import post_save
from django.dispatch import receiver
    
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


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


class ProfileBase(models.Model):
    # Abstract base model for profiles with common fields
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    profile_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True,
    )
    bio = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    MALE = 'male'
    FEMALE = 'female'
    OTHER = 'other'
    GENDER_CHOICES = [
        (MALE,'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other')
    ]
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class StudentProfile(ProfileBase):

    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='studentprofile')
    UNDERGRADUATE = 'undergraduate'
    POSTGRADUATE = 'postgraduate'
    HIGHERSECONDARY = 'highersecondary'
    SSLC = 'sslc'
    DIPLOMA = 'diploma'

    EDUCATION_LEVEL_CHOICES = [
        (DIPLOMA,'Diploma'),
        (SSLC,'sslc'),
        (HIGHERSECONDARY, 'Higher Secondary'),
        (UNDERGRADUATE, 'Under Graduate'),
        (POSTGRADUATE, 'Post Graduate')
    ]
    highest_education_qualification = models.CharField(max_length=30,
    choices=EDUCATION_LEVEL_CHOICES, blank=True, null=True)
    current_education_qualification = models.CharField(max_length=30,
    choices=EDUCATION_LEVEL_CHOICES, blank=True, null=True)
    expected_graduation_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - ({self.user.id})"


class MentorProfile(ProfileBase):

    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='mentorprofile')
    UNDERGRADUATE = 'undergraduate'
    POSTGRADUATE = 'postgraduate'
    HIGHERSECONDARY = 'highersecondary'
    DIPLOMA = 'diploma'

    EDUCATION_LEVEL_CHOICES = [
        (DIPLOMA,'Diploma'),
        (HIGHERSECONDARY, 'Higher Secondary'),
        (UNDERGRADUATE, 'Under Graduate'),
        (POSTGRADUATE, 'Post Graduate')
    ]
    highest_education_qualification = models.CharField(max_length=30,
    choices=EDUCATION_LEVEL_CHOICES, blank=True, null=True)
    experience = models.DecimalField(max_digits=5, decimal_places=1, blank=True, null=True)
    average_rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)
    specialisation = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - ({self.user.id})"


@receiver(post_save, sender=UserAccount)
def create_user_profile(sender, instance, created, **kwargs):
    # signal for creating user profile instance according to the roles
    if created:
        if instance.role == UserAccount.STUDENT:
            StudentProfile.objects.create(user=instance)
        elif instance.role == UserAccount.MENTOR:
            MentorProfile.objects.create(user=instance)


@receiver(post_save, sender=UserAccount)
def save_user_profile(sender, instance, **kwargs):
    # for saving the profiles
    if instance.role == UserAccount.STUDENT and hasattr(instance, 'studentprofile'):
        instance.studentprofile.save()
    elif instance.role == UserAccount.MENTOR and hasattr(instance, 'mentorprofile'):
        instance.mentorprofile.save()