const express = require('express')
const app = express()

function setupWebSocketServer(server) {
    const WebSocket = require('ws'); // Import WebSocket module
    const connectedClients = new Set(); // Set to store connected clients
  
    const wss = new WebSocket.Server({ server }); // Create WebSocket server
  
    wss.on('connection', (ws) => {
      connectedClients.add(ws); // Add new connection to the set
  
      ws.on('message', (message) => {
        const data = JSON.parse(message); // Parse incoming message as JSON
        broadcastChanges(data); // Broadcast the received data to all clients
      });
  
      ws.on('close', () => {
        connectedClients.delete(ws); // Remove disconnected client from the set
      });
    });
}
  
function broadcastChanges(data) {
    connectedClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data)); // Send the data to all open connections
      }
    });
}
  
module.exports = setupWebSocketServer;


app.use(express.json())
app.post('/solution', setupWebSocketServer,(req, res) => {
    const solution = req.body.solution;
    res.send('Your solution is: ' + solution);
});

const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));