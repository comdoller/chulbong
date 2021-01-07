from django.db import models
from datetime import datetime

# Create your models here.

class Map(models.Model):
    id = models.IntegerField(db_column='id', primary_key=True)
    lat = models.DecimalField(db_column='lat', max_digits = 65, decimal_places = 15 )
    lng = models.FloatField(db_column='lng')
    content=models.TextField(db_column='content')

    class Meta:
        managed = False
        db_table = 'Map'

    def __str__(self):
        return ""

class Board(models.Model):
    id=models.IntegerField(db_column='id', primary_key=True)
    title=models.TextField(db_column='title')
    content=models.TextField(db_column='content')
    date = models.DateTimeField(default=datetime.now, blank=True)

    class Meta:
        managed = False
        db_table = 'Board'

    def __str__(self):
        return ""


