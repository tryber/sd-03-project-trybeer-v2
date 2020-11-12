const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const socketIo = require('socket.io');

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
  // setAsDelivered,
} = require('./controllers/saleController');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

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

// app.post('/admin/orders/:id', setAsDelivered);
app.post('/login', loginController);
app.post('/register', registerController);
app.post('/profile', updateNameController);
app.post('/checkout', auth(true), createSale);

const server = app.listen(3001, () => console.log('Listening on port 3001!'));
const io = socketIo(server);

io.on('connect', (socket) => {
  console.log(`${socket.id}`);
});

app.use(errorHandler);
