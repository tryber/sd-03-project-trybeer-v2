const { roomServices, usersServices, authServices } = require('../services');

const onEnterRoom = (socket) => async ({ token, dest }) => {
  const { email, role } = user = await authServices(token);
  const room = await roomServices.getRoomByUsers({ email, role }, dest);
  console.log('room', room);
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
  const { room } = await usersServices.findUserSocket({ email: user.email });
  await roomServices.saveMessage(room, { email: user.email }, message, time);
  return io.to(room).emit('message', { email: user.email, message, time });
};

const onDisconnect = (socket) => async () => {
  await usersServices.deleteUserSocket(socket.id);
};

const auth = async (socket, next) => {
  const header = socket.handshake.headers['authorization'];
  console.log('header', header);
  const { authorization: token } = socket.handshake.headers || {};
  console.log('token', token, socket.handshake.headers);
  const user = await authServices(token);
  if (user.error) return next(new Error(error.message));
  socket.user = user;
};

module.exports = {
  onEnterRoom,
  onMessage,
  onDisconnect,
  auth,
};
