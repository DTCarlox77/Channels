// Obtención del ID de la sala.
const ruta = window.location.pathname;
const array = ruta.split('/');
const id = array[2];

const url = `http://localhost:8000/ws/mensajes/${id}/`;
console.log(url);

const websocket = new WebSocket(url);

// Conexión exitosa con el websocket.
websocket.onopen = () => {
    console.log('Se ha establecido una conexión con el socket.');
}

// El websocket genera una desconexión.
websocket.onclose = () => {
    console.log('Se ha cerrado la conexión con el socket.');
}

// Error del lado del servidor.
websocket.onerror = (error) => {
    console.log('Ha ocurrido un error de conexión: ' + error);
}

function enviarMensaje() {
    const mensaje = document.querySelector('#mensaje');

    const data = {
        mensaje : mensaje.value,
    }

    mensaje.value = '';

    // Esto manda un evento "receive" para el servidor en la parte del método de consumidor.
    websocket.send(JSON.stringify(data));
}

const boton = document.querySelector('#boton');
boton.addEventListener('click', () => {
    enviarMensaje();
});

function insertarMensaje(mensaje) {
    const contenedor = document.querySelector('#contenedor');
    contenedor.innerHTML += `
    <div class="alert alert-primary">
        <h4>User</h4>
        <p>${mensaje}</p>
    </div>
    `;
}

// Esto recibe la información del método "enviar_mensaje".
websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    insertarMensaje(data.mensaje);
}