require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const cors = require('cors');
const {
  userLogin,
  registerUser,
  updateClientName,
  getAllProducts,
  registerSale,
  getOneOrder,
  getAllOrders,
  getAllClientOrders,
  updateOrderStatus,
  messageController,
} = require('./controllers');
const { validateJWT } = require('./middlewares');

const PORT = process.env.API_PORT || 3001;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/images', express.static(`${process.cwd()}/images`));

app.post('/login', userLogin);

app.post('/register', registerUser);

app.put('/update-client-name', validateJWT, updateClientName);

app.get('/products', getAllProducts);

app.post('/checkout', validateJWT, registerSale);

app.get('/admin/orders', validateJWT, getAllOrders);

app.get('/orders', validateJWT, getAllClientOrders);

app.put('/orders/:id', validateJWT, updateOrderStatus);

app.get('/search/:id', validateJWT, getOneOrder);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const handlePrivateMessage = (io) => async (data) => {
  const { chatMessage } = data;
  const currentDate = new Date();
  // const timestamp = currentDate.toLocaleTimeString();
  // `
  //   ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}
  //   ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}
  // `;

  const timestamp = `${currentDate.getHours()}:${(`0${new Date().getMinutes()}`).slice(-2)}`;

  await messageController.savePrivateMessage(data.nickname, data.to, chatMessage, timestamp);

  io.in('room1').emit('private', { from: data.nickname, to: data.to, chatMessage, timestamp });
};

const getPrivateMessages = (socket) => async ({ id, storeId }) => {
  const privateMessages = await messageController.getPrivateMessages(id, storeId);
  socket.join('room1');
  socket.emit('private-history', privateMessages);
};

const findAllMessages = (socket) => async () => {
  const messages = await messageController.findAllMessages();
  socket.emit('store-history', messages);
};

const io = socketIo(server);

io.on('connect', (socket) => {
  socket.on('disconnect', () => socket.broadcast.emit('user-left', { username: socket.username }));
  socket.on('private', handlePrivateMessage(io, socket));
  socket.on('private-history', getPrivateMessages(socket));
  socket.on('store-history', findAllMessages(socket));
});
