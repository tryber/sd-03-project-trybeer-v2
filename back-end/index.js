const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketIo = require('socket.io');

// https://stackoverflow.com/questions/50968152/cross-origin-request-blocked-with-react-and-express
const cors = require('cors');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const userRegister = require('./controllers/userRegister');
const products = require('./controllers/products');
const productList = require('./controllers/productList');
const checkout = require('./controllers/checkout');
const orderDetails = require('./controllers/orderDetails');
const userInfo = require('./controllers/userInfo');
const admin = require('./controllers/admin');
const adminOrders = require('./controllers/adminOrders');
const chat = require('./controllers/chat');
const { saveMessage, saveAdminMessage } = require('./dbMongo/modelSaveMessage');

const app = express();
app.use(cors(), bodyParser.json());

app.use('/', bodyParser.json());

app.use('/admin', admin);
app.use('/checkout', checkout);
app.use('/login', login);
app.use('/userInfo', userInfo);
app.use('/profile', profile);
app.use('/register', userRegister);
app.use('/productList', productList);
app.use('/orderDetails', orderDetails);
app.use('/chat', chat);

app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/products', products);
app.use('/adminOrders', adminOrders);

const PORT = process.env.PORT || 3001;

// socket
const server = app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));

const io = socketIo(server);

io.on('connect', (socket) => {
  console.log(`Socket ${socket.id}`);

  socket.on('message', ({ message, email, time }) => {
    io.emit('message', { message, time });
    saveMessage(message, email, time);
  });
  socket.on('adminMessage', ({ message, email, time, adminNick }) => {
    console.log('Recebi do Admin: ', { message, email, time, adminNick });
    io.emit('message', { message, time });
    saveAdminMessage(message, email, time, adminNick);
  });
});
