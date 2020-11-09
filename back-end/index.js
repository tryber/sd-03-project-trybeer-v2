const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const routers = require('./routers/index');
const { errorHandler } = require('./middlewares');

app.use(cors());

// app.use('/images', express.static(`${process.cwd()}/images`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', routers.login);

// app.use('/register', routers.register);

// app.use('/profile', routers.profile);

// app.use('/products', routers.products);

// app.use('/admin', routers.admin);

// app.use('/orders', routers.orders);

// app.use('/checkout', routers.checkout);

app.use('/chat', (_req, res) => {
  res.send(200);
});

io.on('connection', async (socket) => {
  socket.emit('message', { message: 'Hello, you\'re on!' });
});

app.use(errorHandler);

httpServer.listen(3001, console.log(`listen on port ${3001}`));
