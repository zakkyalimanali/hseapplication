# Generated by Django 4.1.7 on 2023-07-19 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0064_alter_safetycard_short_desc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='safetycard',
            name='short_desc',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]