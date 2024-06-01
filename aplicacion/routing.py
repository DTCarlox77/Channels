from .consumers import MessageConsumer
from django.urls import path

# Se le agrega la r para evitar la lectura de secuencias de escape. El parámetro <int:id> debe ser
# exactamente igual al parámetro del "self.room_id = self.scope['url_route']['kwargs']['id']", al final.
websocket_urlpatterns = [
    path(r'ws/mensajes/<int:id>/', MessageConsumer.as_asgi())
]
