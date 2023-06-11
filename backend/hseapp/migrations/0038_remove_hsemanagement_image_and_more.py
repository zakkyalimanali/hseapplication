# Generated by Django 4.1.7 on 2023-06-11 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0037_incident_photo_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hsemanagement',
            name='image',
        ),
        migrations.AddField(
            model_name='hsemanagement',
            name='management_commitment_document',
            field=models.FileField(blank=True, null=True, upload_to='post_documents'),
        ),
    ]
