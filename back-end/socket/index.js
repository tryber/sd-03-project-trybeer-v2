const socketIo = require('socket.io');

let orders = {};

const changeStatusOrder = ({ id, statusOrder }, io) => {
  orders[id] = statusOrder;
  io.emit('Status', { id, statusOrder });
};

const findOrder = (id, io) => {
  const order = orders.find((order) => order.id === id);
  return io.emit('Status', order);
};

const onConnection = (socket, io) => {
  socket.on('Status', (orderStatus) => changeStatusOrder(orderStatus, io));
  socket.on('Status-id', (id) => findOrder(id, io));
};

module.exports = (httpServer) => {
  const io = socketIo(httpServer, { origins: '*:*' });

  io.on('connection', (socket) => onConnection(socket, io));

  return {
    io,
  };
};
