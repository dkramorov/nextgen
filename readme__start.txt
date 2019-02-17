# ---------------------
# Смотрим версию django
# ---------------------
$ python -m django --version

$ python test_site/manage.py startapp block_scheme

# ---------------------------------
# Необходимо перенести block_scheme
# в проект test_site/test_site,
# чтобы он лежал на том же уровне,
# где settings.py
# ---------------------------------

$ python test_site/manage.py migrate

$ python manage.py createsuperuser