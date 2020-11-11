/* import Moment from 'react-moment'; */
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env;

io.on('connection', (socket) =>{
  console.log(`cliente conectado ${socket.id}`);
});

server.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
