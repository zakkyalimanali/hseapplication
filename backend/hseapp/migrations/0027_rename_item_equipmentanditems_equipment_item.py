# Generated by Django 4.1.7 on 2023-05-30 01:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0026_equipmentanditems_quantity_in_item'),
    ]

    operations = [
        migrations.RenameField(
            model_name='equipmentanditems',
            old_name='item',
            new_name='equipment_item',
        ),
    ]
