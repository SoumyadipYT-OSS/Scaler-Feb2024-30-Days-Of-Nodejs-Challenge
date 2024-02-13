const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    ws.send(message); // echo back the message
  });
});

app.get('/websocket', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <script>
          const socket = new WebSocket('ws://' + location.host);
          socket.onopen = () => socket.send('Hello!');
          socket.onmessage = ({ data }) => console.log(data);
        </script>
        <h1>WebSocket Example</h1>
        <p> Message is sent by client and echoed back by server </p>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});