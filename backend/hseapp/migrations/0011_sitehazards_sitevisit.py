# Generated by Django 4.1.7 on 2023-05-03 22:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0010_remove_sitehazards_sitevisit'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitehazards',
            name='sitevisit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hseapp.sitevisit'),
        ),
    ]
