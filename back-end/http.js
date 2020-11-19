module.exports = (express, routes, cors, bodyParser) => {
  const app = express();
  app.use(bodyParser.json());

  app.use(cors());
  app.use('/login', routes.loginRoute);
  app.use('/register', routes.registerRoute);
  app.use('/profile', routes.profileRoute);
  app.use('/products', routes.productsRoute);
  app.use('/sales', routes.salesRoute);
  app.use('/message', routes.messageRoute);
  app.use('/individualProduct', routes.individualProductRoute);
  app.use('/images', express.static('images'));

  app.use((error, _req, res, _next) => {
    const { message, status } = error;
    if (status < 500) {
      return res.status(status).json(message);
    }
    res.status(500).send('Something broke!');
  });
  return app;
};
