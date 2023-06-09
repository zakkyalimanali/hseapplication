# Generated by Django 4.1.7 on 2023-04-29 22:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('training_date', models.DateField(blank=True, null=True)),
                ('training_expiry', models.DateField(blank=True, null=True)),
                ('training', models.CharField(blank=True, max_length=200, null=True)),
                ('training_provider', models.CharField(blank=True, max_length=200, null=True)),
                ('staff_name', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trainings_as_staff_name', to='hseapp.staff')),
                ('staff_position', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trainings_as_staff_position', to='hseapp.staff')),
            ],
        ),
    ]
