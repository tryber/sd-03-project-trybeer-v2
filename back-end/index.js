const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const validateToken = require('./middlewares/validateToken');

const getUserController = require('./controllers/userController');
const getUserService = require('./services/userService');
const { users } = require('./models');

const userService = getUserService(users);
const userController = getUserController(userService);

const routers = require('./routers/index');
const { errorHandler } = require('./middlewares');

const { getHistory, insert } = require('./mongoModel/messageModel');

app.use(cors());
app.io = io;

app.use('/images', express.static(`${process.cwd()}/images`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/images', express.static(`${process.cwd()}/images`));

app.use('/login', routers.login(userController.loginController));

app.use('/register', routers.register(userController.createUser));

app.use('/profile', routers.profile(userController.updateUser));

app.use('/products', routers.products);

app.use('/admin', routers.admin);

app.use('/orders', routers.orders);

app.use('/checkout', routers.checkout);

app.use('/chat', validateToken, (_req, res) => {
  res.status(200);
});

io.on('connection', async (socket) => {
  socket.on('message', ({ message, user, to }) => {
    console.log(message);
    const dateTime = new Date().toLocaleTimeString();
    const newMessage = {
      from: '',
      to: '',
      text: message,
      time: dateTime,
    };
    if (user.role === 'administrator') {
      newMessage.from = 'Loja';
      newMessage.to = to;
      insert(newMessage, to);
    } else {
      newMessage.from = user.email;
      newMessage.to = to;
      insert(newMessage, user.email);
    }
    io.emit('message', { newMessage });
  });

  socket.on('history', async ({ email }) => {
    console.log(email)
    const previousMessages = await getHistory(email);
    console.log(previousMessages)
    if (previousMessages !== null) socket.emit('history', previousMessages.messages);
  });
});

app.use(errorHandler);

httpServer.listen(3001, console.log(`listen on port ${3001}`));
