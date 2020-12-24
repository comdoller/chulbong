from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from .models import Map
from. models import Board
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

class HttpResponseNoContent(HttpResponse):
    """Special HTTP response with no content, just headers.

    The content operations are ignored.
    """

    def __init__(self, content= "", mimetype=None, status=None, content_type=None):
        super().__init__(status=204)

        if "content-type" in self._headers:
            del self._headers["content-type"]

    def _set_content(self, value):
        pass

    def _get_content(self, value):
        pass

def home(request):
    return render(request, 'map/index.html')

def map(request):
    chulbongAll = Map.objects.all()

    if request.method == 'POST':
        where = request.POST['where']
        print(where)

    return render(request, 'map/map.html', {'points' : chulbongAll, 'where': where})

@csrf_exempt
def regPoint(request):
    
    print('호출')
    lat = request.GET['lat']
    lng = request.GET['lng']

    print(lat)
    print(lng)

    qs = Map(lat=lat, lng=lng)
    qs.save()

    context = {'foo': 'bar'}

    return HttpResponse(json.dumps(context), content_type="application/json")

def request(request):

    title = request.POST['title']
    content = request.POST['content']

    print(title)
    print(content)

    qs = Board(title=title, content=content)
    qs.save()

    return HttpResponseNoContent()








