const socketIo = require('socket.io');

const orders = [];

const addStatusToOrder = (status) => {

};

const onConnection = (socket) => {
  socket.on('Status', (status) => addStatusToOrder(status));
};

module.exports = (httpServer) => {
  const io = socketIo(httpServer, { origins: '*:*' });

  io.on('connection', (socket) => onConnection(socket));

  return {
    io,
  };
};
