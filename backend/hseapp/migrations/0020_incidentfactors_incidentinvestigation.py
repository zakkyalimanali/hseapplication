# Generated by Django 4.1.7 on 2023-05-17 06:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0019_incidentinvestigation_incidentfactors'),
    ]

    operations = [
        migrations.AddField(
            model_name='incidentfactors',
            name='incidentinvestigation',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hseapp.incidentinvestigation'),
        ),
    ]
