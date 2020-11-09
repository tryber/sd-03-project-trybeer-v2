const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');
const getUserController = require('./controllers/userController');
const getUserService = require('./services/userService');
const { users } = require('./models');

const userService = getUserService(users);
const userController = getUserController(userService);

const routers = require('./routers/index');
const { errorHandler } = require('./middlewares');

const app = express();

app.use(cors());

app.use('/images', express.static(`${process.cwd()}/images`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', routers.login(userController));

app.use('/register', routers.register(userController));

app.use('/profile', routers.profile);

app.use('/products', routers.products);

// app.use('/admin', routers.admin);

// app.use('/orders', routers.orders);

// app.use('/checkout', routers.checkout);

app.use(errorHandler);
app.listen(3001, console.log(`listen on port ${3001}`));
