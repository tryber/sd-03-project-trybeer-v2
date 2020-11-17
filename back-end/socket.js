const http = require('http');

const socketIo = require('socket.io');

// const users = [];

module.exports = (connection, app) => {
  const httpServer = http.createServer(app);
  const io = socketIo(httpServer);

  io.on('connection', async (socket) => {
    const db = await connection();
    const chatMessages = await db.collection('messages').find({}).toArray();
    socket.emit('history', chatMessages);
  });

  return {
    ioServer: httpServer,
    io,
  };
};