const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const {
  registerController,
  loginController,
  updateNameController,
} = require('./controllers/userController');

const { getAllProducts } = require('./controllers/productController');

const { createSale, getSales, listSales, saleDetails, setAsDelivered } = require('./controllers/saleController');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (_req, res) => res.send());

app.get('/products', auth(true), (req, res) => getAllProducts(req, res));
app.get('/admin/orders', listSales);
app.get('/admin/orders/:id', saleDetails);
app.post('/admin/orders/:id', setAsDelivered);

app.get('/orders', (req, res) => getSales(req, res));

app.post('/login', (req, res) => loginController(req, res));
app.post('/register', (req, res) => registerController(req, res));
app.post('/profile', (req, res) => updateNameController(req, res));
app.post('/orders', (req, res) => createSale(req, res));

app.use(errorHandler);

app.listen(3001, () => console.log('Listening on port 3001!'));
