# -*- coding: utf-8 -*-
from django.db import models

class SVGObject(models.Model):
    path = models.TextField(blank=True, null=True, verbose_name='Фигура')
    name = models.CharField(max_length=255, blank=True, null=True, db_index=True, verbose_name='Название фигуры')
    position = models.IntegerField(blank=True, null=True, db_index=True, verbose_name='Сортировка')
