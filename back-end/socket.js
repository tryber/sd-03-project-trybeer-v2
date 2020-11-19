const http = require('http');
const socketIo = require('socket.io');
const messageModel = require('./MongoModel/messageModel');

const newMessage = (_socket, io) => async ({ email, message, role }) => {
  const chat = await messageModel.getAllChats();
  const date = new Date();
  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const strgTime = `${time}`;
  const nick = (role === 'administrador') ? 'Loja' : email;
  const newEntry = { nick, strgTime, message };
  const actualChat = chat.filter((e) => e.email === email);

  if (actualChat.length > 0) {
    const newChat = [...actualChat[0].messages, newEntry];
    await messageModel.saveMessage(email, newChat);
  } else {
    await messageModel.createChat(email, [newEntry]);
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
      const message = (chat.length === 0) ? [] : history[0].messages;
      socket.emit('history', message);
    });
    socket.on('newMessage', newMessage(socket, io));
  });

  return {
    ioServer: httpServer,
    io,
  };
};
