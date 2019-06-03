import os
import logging

# ------
# Ошибка
# ------
# NameError: name 'Celery' is not defined
from celery import Celery
# -------
# Ошибка:
# -------
# register_loader_type(importlib_bootstrap.SourceFileLoader, DefaultProvider)
# AttributeError: module 'importlib._bootstrap' has no attribute 'SourceFileLoader
# --------
# Решение:
# --------
# python3 -m ensurepip --upgrade

#import celery
#logger = logging.getLogger(__name__)
#logger.info(f'---[celery path]--- {celery.__file__}')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'test_site.settings')

#app = celery.Celery('test_site')
app = Celery('test_site')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

