const socketIo = require('socket.io');
// const { saveMessage } = require('./dbMongo/modelSaveMessage');

const io = socketIo();

io.on('connect', (socket) => {
  console.log(`Socket ${socket.id}`);
});
