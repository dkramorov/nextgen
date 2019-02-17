import os, sys

path = "/home/a/a223223/test_site/public_html"
# -------------------------------
# append project.path to sys.path
# -------------------------------
if not path in sys.path:
  sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = "test_site.settings"

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()
