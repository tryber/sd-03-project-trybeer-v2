const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const getUserController = require('./controllers/userController');
const getUserService = require('./services/userService');
const { users } = require('./models');

const userService = getUserService(users);
const userController = getUserController(userService);

const routers = require('./routers/index');
const { errorHandler } = require('./middlewares');

app.use(cors());
app.io = io;

app.use('/images', express.static(`${process.cwd()}/images`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.body);
  next();
});

app.use('/images', express.static(`${process.cwd()}/images`));

app.use('/login', routers.login(userController.loginController));

app.use('/register', routers.register(userController.createUser));

app.use('/profile', routers.profile(userController.updateUser));

app.use('/products', routers.products);

app.use('/admin', routers.admin);

app.use('/orders', routers.orders);

app.use('/checkout', routers.checkout);

app.use('/chat', (_req, res) => {
  res.status(200);
});

io.on('connection', async (socket) => {
  socket.on('message', ({ message }) => {
    console.log('mensagem chegou');
    io.emit('message', { message });
  });
});

app.use(errorHandler);

httpServer.listen(3001, console.log(`listen on port ${3001}`));
