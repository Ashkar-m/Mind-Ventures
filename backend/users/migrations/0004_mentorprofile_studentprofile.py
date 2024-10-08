# Generated by Django 5.1.1 on 2024-09-30 05:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_useraccount_is_staff_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MentorProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pics/')),
                ('bio', models.TextField(blank=True)),
                ('date_of_birth', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('highest_education_qualification', models.CharField(blank=True, choices=[('diploma', 'Diploma'), ('highersecondary', 'Higher Secondary'), ('undergraduate', 'Under Graduate'), ('postgraduate', 'Post Graduate')], max_length=30, null=True)),
                ('experience', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('average_rating', models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True)),
                ('specialisation', models.CharField(blank=True, max_length=100, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StudentProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pics/')),
                ('bio', models.TextField(blank=True)),
                ('date_of_birth', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('highest_education_qualification', models.CharField(blank=True, choices=[('diploma', 'Diploma'), ('sslc', 'sslc'), ('highersecondary', 'Higher Secondary'), ('undergraduate', 'Under Graduate'), ('postgraduate', 'Post Graduate')], max_length=30, null=True)),
                ('current_education_qualification', models.CharField(blank=True, choices=[('diploma', 'Diploma'), ('sslc', 'sslc'), ('highersecondary', 'Higher Secondary'), ('undergraduate', 'Under Graduate'), ('postgraduate', 'Post Graduate')], max_length=30, null=True)),
                ('expected_graduation_date', models.DateTimeField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
