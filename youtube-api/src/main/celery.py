from __future__ import absolute_import, unicode_literals
import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')

app = Celery('celery_app')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.timezone = 'Europe/Kiev'
app.autodiscover_tasks()
app.conf.task_routes = {
    "youtube_media.tasks.save_items": {'queue': 'save_items'},
    "youtube_media.tasks.featured_links": {'queue': 'featured_links'},
}
