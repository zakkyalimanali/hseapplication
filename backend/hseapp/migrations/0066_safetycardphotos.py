# Generated by Django 4.1.7 on 2023-08-24 06:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0065_alter_safetycard_short_desc'),
    ]

    operations = [
        migrations.CreateModel(
            name='SafetyCardPhotos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('incident_photo', models.ImageField(blank=True, null=True, upload_to='post_images')),
                ('incident', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hseapp.safetycard')),
            ],
        ),
    ]
