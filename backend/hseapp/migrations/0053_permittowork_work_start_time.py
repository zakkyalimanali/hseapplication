# Generated by Django 4.1.7 on 2023-07-09 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0052_alter_permittowork_work_completed_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='permittowork',
            name='work_start_time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
