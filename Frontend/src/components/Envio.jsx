import { useEffect, useState } from 'react';
import Mensaje from './Mensaje';

const WebSocketComponent = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketUrl = `ws://localhost:8000/ws/mensajes/${id}/`;

  useEffect(() => {
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log('Conexión exitosa con el websocket.');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data);
    };

    socket.onclose = () => {
      console.log('Se ha cerrado la conexión con el websocket.');
    };

    return () => {
      socket.close();
    };
  }, [socketUrl]);

  const sendMessage = () => {
    const socket = new WebSocket(socketUrl);
    const message = { mensaje : inputMessage };

    socket.onopen = () => {
      socket.send(JSON.stringify(message));
      setInputMessage('');
    };

    socket.onclose = () => {
      console.log('El websocket ha finalizado su conexión');
    };
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <Mensaje key={index} nombre="User" mensaje={msg.mensaje} fecha="14 de Julio"/>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketComponent;
