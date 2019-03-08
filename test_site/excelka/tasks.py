# -*- coding: utf-8 -*-
from django.conf import settings
from test_site.celery import app
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@app.task(name="test_task", bind=True)
def test_task(self, *args, **kwargs):
    logger.warn("we are started {}...".format(kwargs))

# Starting the worker
# $ celery -A test_site worker -l info
# Remote Control
# $ celery -A test_site inspect active
