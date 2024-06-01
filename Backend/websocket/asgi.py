"""
ASGI config for websocket project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import aplicacion.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'websocket.settings')


application = ProtocolTypeRouter({
    # Método de conexión entre el cliente y el servidor.
    'http': get_asgi_application(),
    
    # WebSocket chat handler
    'websocket': AuthMiddlewareStack(
        URLRouter(
            # Se establece la aplicación que funcionará de modo asíncrono y se le comparten los endpoints del mismo.
            aplicacion.routing.websocket_urlpatterns
        )
    ),
})