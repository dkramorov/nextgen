# -*- coding: utf-8 -*-
#from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    context = {
      'name':'binary_com',
    }
    return render(request, 'binary_com/index.html', context)
    #return HttpResponse("Hi")
