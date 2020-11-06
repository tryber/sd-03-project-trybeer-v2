const http = require('http');
const socketIo = require('socket.io');

const onConnection = (socket) => {
  return console.log('Batata');
};

module.exports = (httpServer) => {
  const io = socketIo(httpServer, { origins: '*:*'});

  io.on('connection', (socket) => onConnection(socket));

  return {
    io,
  };
};
