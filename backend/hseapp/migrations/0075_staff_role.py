from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hseapp', '0074_investigationteammember'),
    ]

    operations = [
        migrations.AddField(
            model_name='staff',
            name='role',
            field=models.CharField(
                choices=[
                    ('staff', 'Staff'),
                    ('supervisor', 'Supervisor'),
                    ('hse_officer', 'HSE Officer'),
                    ('company_admin', 'Company Admin'),
                ],
                default='staff',
                max_length=20,
            ),
        ),
    ]
