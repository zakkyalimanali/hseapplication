# Generated by Django 4.1.7 on 2023-06-03 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0032_hsemanagement'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hsemanagement',
            old_name='description',
            new_name='content',
        ),
        migrations.RemoveField(
            model_name='hsemanagement',
            name='image_url',
        ),
        migrations.AddField(
            model_name='hsemanagement',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='post_images'),
        ),
        migrations.AlterField(
            model_name='hsemanagement',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]