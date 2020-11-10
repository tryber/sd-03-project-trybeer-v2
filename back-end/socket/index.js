const socketIo = require('socket.io');

const orders = [];

const addStatusToOrder = (status) => {

};

const findOrder = (id, socket) => {
  const order = orders.find((order) => order.id === id);
  return socket.emit('Status', order);
}

const onConnection = (socket) => {
  socket.on('Status', (status) => addStatusToOrder(status));
  socketIo.on('Status-id', (id) => findOrder(id, socket))
};

module.exports = (httpServer) => {
  const io = socketIo(httpServer, { origins: '*:*' });

  io.on('connection', (socket) => onConnection(socket));

  return {
    io,
  };
};
