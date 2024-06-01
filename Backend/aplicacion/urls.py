from django.urls import path
from .routing import websocket_urlpatterns
from django.conf.urls import include
from .views import main

urlpatterns = [
    path('ws/', include(websocket_urlpatterns)),
    path('chat/<int:id>/', main, name='main')
]
