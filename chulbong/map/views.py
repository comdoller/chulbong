from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
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
        print(where)

    return render(request, 'map/map.html', {'points' : chulbongAll, 'where': where})


def regPoint(request):

    lat = request.GET['lat']
    lng = request.GET['lng']

    qs = Map(lat=lat, lng=lng)
    qs.save()

    context = {'foo': 'bar'}

    return HttpResponse(json.dumps(context), content_type="application/json")

@csrf_exempt
def request(request):

    title = request.POST['title']
    content = request.POST['content']

    print(title)
    print(content)

    qs = Board(title=title, content=content)
    qs.save()

    return HttpResponse(status=204)









