
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Map
from. models import Board

import json

def home(request):

    return render(request, 'map/index.html')

def map(request):

    chulbongAll = Map.objects.all()

    where =''

    if request.method == 'POST':
        where = request.POST['where']

    return render(request, 'map/map.html', {'points' : chulbongAll, 'where': where})

@csrf_exempt
def regPoint(request):

    lat = request.POST['lat']
    lng = request.POST['lng']
    content = request.POST['content']

    c_cnt = request.POST['c_cnt']
    p_cnt = request.POST['p_cnt']

    qs = Map(lat=lat, lng=lng, c_cnt=c_cnt, p_cnt=p_cnt, content=content)
    qs.save()

    context = {'foo': 'bar'}

    return HttpResponse(json.dumps(context), content_type="application/json")

def request(request):

    title = request.POST['title']
    content = request.POST['content']

    qs = Board(title=title, content=content)
    qs.save()

    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))






