from channels.generic.websocket import AsyncWebsocketConsumer
import json

# Creación de un consumidor para manejar las salas de chat.
class MessageConsumer(AsyncWebsocketConsumer):
    
    # Evento de conexión de cada usuario.
    async def connect(self):
        
        # Obtención del parámetro de la URL para acceder a una sala.
        self.room_id = self.scope['url_route']['kwargs']['id']
        # Creación de un nombre de sala con base al dato de la URL.
        self.room_group_name = f'room_{self.room_id}'
        
        # Creación de la sala y anexo a las capas del canal.
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        # Aceptación al usuario para que pueda recibir los eventos socket en la sala.
        await self.accept()
    
    # Evento para la desconexión de cada usuario.
    async def disconnect(self, code):
        
        # Elimina al usuario del canal de chats.
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    # Recibe un evento desde el cliente a través de "websocket.send".
    async def receive(self, text_data):
        
        # El data es el objeto que manda el cliente, se le aplica json.loads para pasarlo a diccionario de Python.
        data = json.loads(text_data)
        
        # Acceso a un atributo de objeto del data procesado anteriormente.
        mensaje = data['mensaje']
        
        # Dar una respuesta para todos los clientes conectados a esta misma sala.
        await self.channel_layer.group_send(
            # Conexión con la misma sala.
            self.room_group_name,
            {
                # Nombre del método a ejecutar para mandar la información.
                'type' : 'enviar_mensaje',
                # Información a enviar y recibir a través del "EVENT"
                'mensaje' : mensaje
            }
        )
    
    # Método a ejecutar para mandar la información establecida en el método anterior, el nombre de coloca en Type.
    async def enviar_mensaje(self, event):
        
        # Se reciben los atributos o valores establecidos en el método anterior, en este caso se estableció a mensaje.
        mensaje = event['mensaje']
        # Envío del mensaje al cliente.
        # El JSON.dumps es para enviar de forma serializada la información al cliente.
        await self.send(text_data=json.dumps({
            # Se manda un valor de clave "mensaje".
            'mensaje' : mensaje
        }))