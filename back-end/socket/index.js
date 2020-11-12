const socketIo = require('socket.io');

// const findOrder = async (id, io) => {
//   const order = await salesServices.getSale(id)
//   return io.emit('Status', order);
// };

const onConnection = (socket, io) => {
  // socket.on('Status-id', (id) => findOrder(id, io));
  socket.on('disconnect', () => console.log('kkk'))
};

module.exports = (httpServer) => {
  const io = socketIo(httpServer, { origins: '*:*' });

  io.on('connection', (socket) => onConnection(socket, io));

  return {
    io,
  };
};
