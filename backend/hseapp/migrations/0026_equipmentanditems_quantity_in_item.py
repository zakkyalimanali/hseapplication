# Generated by Django 4.1.7 on 2023-05-30 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0025_remove_equipmentanditems_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipmentanditems',
            name='quantity_in_item',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
