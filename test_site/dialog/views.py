# -*- coding: utf-8 -*-
import os
import logging

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render

logger = logging.getLogger(__name__)

def index(request):
    context = {
      'name':'test_dialog',
    }
    return render(request, 'dialog/test.html', context)
    #return HttpResponse("Hi")
