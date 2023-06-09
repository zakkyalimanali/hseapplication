# Generated by Django 4.1.7 on 2023-04-30 00:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0004_rename_position_training_staff_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='training',
            name='staff_name',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trainings_staff_name', to='hseapp.staff'),
        ),
        migrations.AlterField(
            model_name='training',
            name='staff_position',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trainings_staff_position', to='hseapp.staff'),
        ),
    ]
