const socketIo = require('socket.io');
const { roomServices, usersServices, authServices } = require('../services');

const onConnection = (socket, io) => {
  // socket.on('Status-id', (id) => findOrder(id, io));
  socket.on('enterRoom', async ({ token, dest }) => {
    const user = await authServices(token);
    const room = await roomServices.getRoomByUsers({ email: user.email }, dest);
    if (!room) {
      const newRoom = await roomServices.createRoom(user, dest);
      usersServices.saveUserSocket(socket.id, newRoom, { email: user.email });
      return socket.join(newRoom);
    }
    usersServices.saveUserSocket(socket.id, room.id, { email: user.email });
    socket.join(room.id);
    const { messages = [] } = await roomServices.getRoomById(room.id) || {};
    return socket.emit('lastMessages', messages);
  });

  socket.on('message', async ({ token, message }) => {
    const user = await authServices(token);
    const { room } = await usersServices.findUserSocket({ email: user.email });
    await roomServices.saveMessage(room, user, message);
    return io.to(room).emit('message', { user, message });
  });
  // const findOrder = async (id, io) => {
  //   const order = await salesServices.getSale(id)
  //   return io.emit('Status', order);
  // };
  socket.on('disconnect', () => {
    usersServices.deleteUserSocket(socket.id);
  });
};

module.exports = (httpServer) => {
  const io = socketIo(httpServer, { origins: '*:*' });
  io.on('connection', (socket) => onConnection(socket, io));
  return { io };
};
