# Generated by Django 4.1.7 on 2023-06-07 04:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0036_remove_hsemanagement_document'),
    ]

    operations = [
        migrations.AddField(
            model_name='incident',
            name='photo_image',
            field=models.ImageField(blank=True, null=True, upload_to='post_images'),
        ),
    ]
