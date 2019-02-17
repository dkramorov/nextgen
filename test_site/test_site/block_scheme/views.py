#from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    context = {
      'name':'svg_test',
    }
    return render(request, 'svg/svg_test.html', context)
    #return HttpResponse("Hi")
