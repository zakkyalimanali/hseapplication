# Generated by Django 4.1.7 on 2023-07-18 06:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0060_alter_incident_raised_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='SafetyCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('short_desc', models.CharField(blank=True, max_length=200, null=True)),
                ('what_happened', models.CharField(blank=True, max_length=500, null=True)),
                ('why_happened', models.CharField(blank=True, max_length=500, null=True)),
                ('date_raised', models.DateField(blank=True, null=True)),
                ('life_saving_rule', models.CharField(blank=True, max_length=500, null=True)),
                ('findings', models.CharField(blank=True, max_length=100, null=True)),
                ('incident_date', models.DateField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=100, null=True)),
                ('discussion', models.CharField(blank=True, max_length=100, null=True)),
                ('target_date', models.DateField(blank=True, null=True)),
                ('follow_up', models.CharField(blank=True, max_length=100, null=True)),
                ('follow_up_remarks', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.CharField(blank=True, max_length=100, null=True)),
                ('responsible_party', models.CharField(blank=True, max_length=100, null=True)),
                ('raised_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hseapp.staff')),
            ],
        ),
    ]
