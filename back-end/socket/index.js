const socketIo = require('socket.io');
const { onEnterRoom, onMessage, onDisconnect } = require('./chat');

const onConnection = (socket, io) => {
  socket.on('enterRoom', onEnterRoom(socket));
  socket.on('message', onMessage(socket, io));
  socket.on('disconnect', onDisconnect(socket));
};

module.exports = (httpServer) => {
  const io = socketIo(httpServer, { origins: '*:*' });
  // io.use(auth);
  io.on('connection', (socket) => onConnection(socket, io));
  return { io };
};
