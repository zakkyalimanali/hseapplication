# Generated by Django 4.1.7 on 2023-06-17 07:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0045_jobsafetysteps'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jobsafetysteps',
            name='controls',
        ),
        migrations.RemoveField(
            model_name='jobsafetysteps',
            name='hazards',
        ),
        migrations.CreateModel(
            name='JobSafetyHazards',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hazards', models.CharField(blank=True, max_length=300, null=True)),
                ('controls', models.CharField(blank=True, max_length=300, null=True)),
                ('job_safety_analysis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hseapp.jobsafetyanalysis')),
            ],
        ),
    ]
