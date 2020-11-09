const socketIo = require('socket.io');

const onConnection = (socket) => console.log('Batata');

module.exports = (httpServer) => {
  const io = socketIo(httpServer, { origins: '*:*' });

  io.on('connection', (socket) => onConnection(socket));

  return {
    io,
  };
};
