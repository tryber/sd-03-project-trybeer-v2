const http = require('http');
const socketIo = require('socket.io');
const messageModel = require('./models/messageModel');

const newMessage = (_socket, io) => async ({ email, message, role }) => {
  const chat = await messageModel.getAllChats();
  const date = new Date();
  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const strgTime = `${time}`;
  const nick = (role === 'administrador') ? 'Loja' : email;
  const newEntry = { nick, strgTime, message };

  if (chat.some((e) => e.email === email)) {
    await messageModel.saveMessage(email, newEntry, chat);
  } else {
    await messageModel.createChat(email, newEntry);
  }

  io.to(email).emit('message', { nick, newEntry, message });
};

module.exports = (connection, app) => {
  const httpServer = http.createServer(app);
  const io = socketIo(httpServer);

  io.on('connection', async (socket) => {
    socket.on('joinChat', async (email) => {
      socket.join(email);
      const chat = await messageModel.getAllChats();
      const history = chat.filter((e) => e.email === email);
      socket.emit('history', history.messages);
    });
    socket.on('newMessage', newMessage(socket, io));
  });

  return {
    ioServer: httpServer,
    io,
  };
};
