# Generated by Django 4.1.7 on 2023-07-04 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0051_alter_signitures_person_signiture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='signitures',
            name='person_signiture',
            field=models.ImageField(blank=True, null=True, upload_to='post_images'),
        ),
    ]
