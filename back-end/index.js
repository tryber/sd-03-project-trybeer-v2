const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const controllers = require('./controllers');

const app = express();

app.use(cors());
app.use(bodyParser.json());
console.log(process.env.HOSTNAME);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/user', controllers.usersController);
app.use('/products', controllers.productsController);
app.use('/sales', controllers.salesController);

app.get('/', async (_req, res) => res.send('Hello, Trybeer'));

app.use((err, _req, res, _next) => {
  if (err.payload) return res.status(err.status).json(err.payload);
  if (err.message.match(/^duplicate./i)) {
    return res.status(400).json({ message: 'E-mail already in database.' });
  }
  return res.status(500).json({ message: 'Internal Error' });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`Escutando porta nr. ${PORT}`));
