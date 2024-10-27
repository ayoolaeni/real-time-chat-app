const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set up a socket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages and broadcast them to all users
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});