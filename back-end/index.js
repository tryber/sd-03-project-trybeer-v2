require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const auth = require('./services/auth');
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

app.get('/orders/:id', auth, orderController.getOrderDetail);
app.put('/orders/:id', auth, orderController.updateOrder);

// app.get('/testroute', async (req, res) => {
//   const list = await products.findAll();

//   return res.status(200).json(list);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
