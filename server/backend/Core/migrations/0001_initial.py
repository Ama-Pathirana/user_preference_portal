# Generated by Django 5.2.2 on 2025-06-06 00:39

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPreferences',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('theme', models.CharField(default='light', max_length=20)),
                ('font_family', models.CharField(default='Arial, sans-serif', max_length=50)),
                ('primary_color', models.CharField(default='#1CA1C1', max_length=20)),
                ('animations_enabled', models.BooleanField(default=True)),
                ('email_notifications', models.BooleanField(default=True)),
                ('sms_notifications', models.BooleanField(default=False)),
                ('push_notifications', models.BooleanField(default=False)),
                ('notification_sound', models.BooleanField(default=True)),
                ('notification_vibration', models.BooleanField(default=True)),
                ('notification_light', models.BooleanField(default=True)),
                ('profile_pic_visibility', models.CharField(default='everyone', max_length=20)),
                ('profile_pic_download', models.CharField(default='everyone', max_length=20)),
                ('account_privacy', models.CharField(default='public', max_length=20)),
                ('connection_requests', models.CharField(default='everyone', max_length=20)),
                ('search_engine_visibility', models.BooleanField(default=True)),
                ('third_party_access', models.BooleanField(default=False)),
                ('active_status_visibility', models.BooleanField(default=True)),
                ('profile_view_tracking', models.BooleanField(default=True)),
                ('data_retention', models.CharField(default='1_month', max_length=20)),
                ('data_export', models.CharField(default='full', max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='preferences', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
