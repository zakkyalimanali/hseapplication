# Generated by Django 4.1.7 on 2023-05-04 03:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0012_sitehazards_visit'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sitehazards',
            name='visit',
        ),
    ]
