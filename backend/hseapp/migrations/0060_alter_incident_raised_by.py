# Generated by Django 4.1.7 on 2023-07-18 01:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0059_riskregister_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incident',
            name='raised_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hseapp.staff'),
        ),
    ]
