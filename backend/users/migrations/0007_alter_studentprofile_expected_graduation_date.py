# Generated by Django 5.1.1 on 2024-10-06 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_mentorprofile_date_of_birth_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentprofile',
            name='expected_graduation_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
