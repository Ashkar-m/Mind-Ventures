# Generated by Django 5.1.1 on 2024-10-23 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_mentorprofile_profile_picture_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='mentorprofile',
            name='document_image',
            field=models.ImageField(blank=True, null=True, upload_to='documents/'),
        ),
    ]
