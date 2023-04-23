# Generated by Django 4.1.7 on 2023-04-11 00:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0002_remove_toolboxtalk_presenter'),
    ]

    operations = [
        migrations.AddField(
            model_name='toolboxtalk',
            name='presenter',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='toolbox_talks_presenter', to='hseapp.staff'),
            preserve_default=False,
        ),
    ]