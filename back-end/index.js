require('dotenv').config();
const socketIo = require('socket.io');
const app = require('./app');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIo(server);

io.on('connect', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('message', ({ messageValue }) => {
    console.log(`${socket.id} : ${messageValue}`);
  });
});

module.exports = server;
