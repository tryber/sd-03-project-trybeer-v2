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
  getAllConvos,
  getConvoMsgs,
  createConvo,
  updateConvo,
} = require('./controllers/chatController');

const {
  listSales,
  createSale,
  getSalesByUserId,
  saleDetails,
  setOrderStatus,
} = require('./controllers/saleController');

const auth = require('./middlewares/auth');
/* const errorHandler = require('./middlewares/errorHandler'); */

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (_req, res) => res.send());

app.get('/products', auth(true), getAllProducts);
app.get('/admin/orders', listSales);
app.get('/admin/orders/:id', auth(true), saleDetails);
app.get('/admin/chats', getAllConvos);
app.get('/admin/chat/:email', getConvoMsgs);
app.get('/orders', auth(true), getSalesByUserId);

app.post('/admin/orders/:id', auth(true), setOrderStatus);
app.post('/admin/chat/:email', createConvo);
app.post('/login', loginController);
app.post('/register', registerController);
app.post('/profile', updateNameController);
app.post('/checkout', auth(true), createSale);

app.put('/admin/chat/:email', updateConvo);

const server = app.listen(3001, () => console.log('Listening on port 3001!'));
// Express e socket.io rodando na mesma porta por conta do bind

const io = socketIo(server);
// Namespace padrão. io.* é o mesmo que io.sockets.*
io.on('connect', (socket) => {
  console.log(`Nova conexão: ${socket.id}`);

  socket.on('joinRoomAsCustomer', (email) => {
    socket.join(email);
    console.log('Cliente conectado na sala', email);
  })

  socket.on('joinRoomAsAdmin', (email) => {
    socket.join(email);
    console.log('Admin conectado na sala', email);
  })

  socket.on('msgToAdmin', async (objMsg) => {
    const { timeStamp, text, isAdminMsg } = objMsg;
    console.log(`Cliente >>> ${timeStamp} ${text} ${isAdminMsg}`);
    socket.emit('msgToAdmin', objMsg);
  });

  socket.on('msgToCustomer', async (objMsg) => {
    const { timeStamp, text, isAdminMsg } = objMsg;
    console.log(`Admin >>> ${timeStamp} ${text} ${isAdminMsg}`);
    socket.emit('msgToCustomer', objMsg);
  });
  
  socket.on('disconnect', () => {
    console.log(socket.id, 'desconectou-se');
  });
});
