# Generated by Django 5.1.1 on 2024-10-26 12:07

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_alter_course_title'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='chapters',
            options={'ordering': ['order']},
        ),
        migrations.RemoveField(
            model_name='chapters',
            name='video_file',
        ),
        migrations.AddField(
            model_name='chapters',
            name='video_url',
            field=models.URLField(blank=True, help_text='Enter the full YouTube URL (e.g., https://www.youtube.com/watch?v=example)', null=True, validators=[django.core.validators.URLValidator()]),
        ),
    ]