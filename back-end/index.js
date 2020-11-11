require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const Http = require('http');
const IO = require('socket.io');
const path = require('path');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const auth = require('./services/auth');
const chatModel = require('./models/models/chatModel');
// const { sales, products, users } = require('./models');

const app = express();
const http = Http.createServer(app);
const io = IO(http);

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
app.get('admin/chat', auth, async (_req, res) => {
  const chatList = await chatModel.listAllRooms();

  res.status(200).json(chatList);
});

app.get('/orders/:id', auth, orderController.getOrderDetail);
app.put('/orders/:id', auth, orderController.updateOrder);

app.put('/inprogress/:id', auth, orderController.updateInProgressOrder);

// app.get('/testroute', async (req, res) => {
//   const list = await sales.update({ status: 'Preparando' }, { where: { id: 1 } });
//   await sales.update({ status: 'Entregue' }, { where: { id: 2 } });
//   return res.status(200).json(list);
// });

io.on('connection', async (socket) => {
  socket.on('join', async (email) => {
    socket.join(`${email}`);
    const history = await chatModel.listRoomMessages(email);
    io.to(`${email}`).emit('history', history);
  });

  socket.on('message', async ({ email, message, nick, time }) => {
    await chatModel.addMessage(email, { time, nick, message });
    io.to(`${email}`).emit('message', { email, message, nick, time });
  });
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
