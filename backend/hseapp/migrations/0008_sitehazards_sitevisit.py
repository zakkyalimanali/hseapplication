# Generated by Django 4.1.7 on 2023-05-03 21:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0007_sitehazards_sitevisit'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitehazards',
            name='sitevisit',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='hseapp.sitevisit'),
            preserve_default=False,
        ),
    ]