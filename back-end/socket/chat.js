const { roomServices, usersServices, authServices } = require('../services');

const onEnterRoom = (socket) => async ({ token, dest }) => {
  const user = await authServices(token);
  const { email, role } = user;
  const room = await roomServices.getRoomByUsers({ email, role }, dest);

  if (!room) {
    const newRoom = await roomServices.createRoom({ role, email }, dest);
    usersServices.saveUserSocket(socket.id, newRoom, { email });
    return socket.join(newRoom);
  }
  usersServices.saveUserSocket(socket.id, room.id, { email });
  socket.join(room.id);
  const { messages = [] } = await roomServices.getRoomById(room.id) || {};
  return socket.emit('lastMessages', messages);
};

const onMessage = (_socket, io) => async ({ token, message }) => {
  const user = await authServices(token);
  const time = roomServices.getTime();
  const { room } = await usersServices.findUserSocket({ email: user.email }) || {};
  await roomServices.saveMessage(room, { email: user.email }, message, time);
  return io.to(room).emit('message', { email: user.email, message, time });
};

const onDisconnect = (socket) => async () => {
  await usersServices.deleteUserSocket(socket.id);
};

module.exports = {
  onEnterRoom,
  onMessage,
  onDisconnect,
};
