require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const IO = require('socket.io');
const path = require('path');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const auth = require('./services/auth');
const chatModel = require('./models/models/chatModel');
// const { sales, products, users } = require('./models');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/login', userController.userLogin);
app.post('/register', userController.userRegister);
app.post('/orders', auth, orderController.registerNewSale);

app.put('/users/:email', auth, userController.userUpdate);

app.get('/products', auth, productController.listAllProducts);
app.get('/orders', auth, orderController.listAllOrders);
app.get('/admin/orders', auth, orderController.listAllOrders);
app.get('/admin/chat', auth, async (_req, res) => {
  const chatList = await chatModel.listAllRooms();

  res.status(200).json(chatList);
});

app.get('/orders/:id', auth, orderController.getOrderDetail);
app.put('/orders/:id', auth, orderController.updateOrder);

app.put('/inprogress/:id', auth, orderController.updateInProgressOrder);

// app.get('/testroute', async (req, res) => {
//   const test = await chatModel.addMessage('zebirita@gmail.com', { time: '19:11', nick: 'Zé Birita', message: 'Teste' });
//   const list = await chatModel.listRoomMessages('zebirita@gmail.com');
//   res.status(200).json(list);
// });

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });

const io = IO.listen(server);

io.on('connection', async (socket) => {
  socket.on('join', async (email) => {
    socket.join(`${email}`);
    const history = await chatModel.listRoomMessages(email);
    socket.emit('history', history);
  });

  socket.on('message', async ({ email, message, nick, time }) => {
    await chatModel.addMessage(email, { time, nick, message });
    io.to(`${email}`).emit('message', { email, message, nick, time });
  });
});
