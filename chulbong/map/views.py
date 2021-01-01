from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

from .models import Map
from. models import Board
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def home(request):
    return render(request, 'map/index.html')

def map(request):
    chulbongAll = Map.objects.all()

    where =''

    if request.method == 'POST':
        where = request.POST['where']

    if request.method == 'GET' :
        lat = request.GET['lat']
        lng = request.GET['lng']
        context = {'lat': lat, 'lng': lng}
        return render(request, 'map/map.html', {'points': chulbongAll, 'lat': lat, 'lng': lng})

        #return HttpResponse(json.dumps(context), content_type="application/json")
        #return JsonResponse(context)


    return render(request, 'map/map.html', {'points' : chulbongAll, 'where': where})
    #return render(request, 'map/map.html', {'points': chulbongAll, 'where': where})


def regPoint(request):

    lat = request.GET['lat']
    lng = request.GET['lng']

    qs = Map(lat=lat, lng=lng)
    qs.save()

    context = {'foo': 'bar'}

    return HttpResponse(json.dumps(context), content_type="application/json")


def request(request):

    print("호출")

    title = request.POST['title']
    content = request.POST['content']

    print(title)
    print(content)

    qs = Board(title=title, content=content)
    qs.save()

    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))









