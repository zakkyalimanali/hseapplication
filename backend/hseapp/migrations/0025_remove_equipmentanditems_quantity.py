# Generated by Django 4.1.7 on 2023-05-29 07:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0024_rename_itemperbox_itemsperbox'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='equipmentanditems',
            name='quantity',
        ),
    ]