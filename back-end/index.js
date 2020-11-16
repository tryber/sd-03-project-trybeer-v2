const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

const {
  registerController,
  loginController,
  updateNameController,
} = require('./controllers/userController');

const { getAllProducts } = require('./controllers/productController');

const {
  listSales,
  createSale,
  getSalesByUserId,
  saleDetails,
  setOrderStatus,
} = require('./controllers/saleController');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const chatController = require('./controllers/chatController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (_req, res) => res.send());

app.get('/products', auth(true), getAllProducts);
app.get('/admin/orders', listSales);
app.get('/admin/orders/:id', auth(true), saleDetails);
app.get('/orders', auth(true), getSalesByUserId);

app.post('/admin/orders/:id', auth(true), setOrderStatus);
app.post('/login', loginController);
app.post('/register', registerController);
app.post('/profile', updateNameController);
app.post('/checkout', auth(true), createSale);

const server = app.listen(3001, () => console.log('Listening on port 3001!'));
const io = socketIo(server);
io.on('connect', (socket) => {
  console.log(`${socket.id}`);
  socket.on('message', async (obgMsg) => {
    console.log(`${obgMsg}`);
  });
});

// Express e socket.io rodando na mesma porta por conta desse bind
io.on('connect', (socket) => {
  console.log('Nova conexão:', socket.id);

  // socket.on('msgToClient', (msg) => {
  //   io.emit('msgToClient', msg);
  // });

  socket.on('syncHistory', ({ chatHistory, clientEmail }) => {
    chatController.updateConvo(clientEmail, chatHistory);
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'desconectou-se');
  });
});
