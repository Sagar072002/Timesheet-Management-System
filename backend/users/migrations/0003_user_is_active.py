# Generated by Django 5.0.1 on 2024-02-07 21:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_remove_user_date_joined_remove_user_first_name_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
    ]