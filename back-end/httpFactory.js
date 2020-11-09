const path = require('path');
const express = require('express');
const { productsRouter, usersRouter, salesRouter } = require('./routes');
const { errorMiddleware } = require('./middleware');

module.exports = (app, io) => {
  app.use('/sales', salesRouter(io));
  app.use('/images', express.static(path.join(__dirname, './images')));
  app.use('/products', productsRouter(io));
  app.use('/user', usersRouter(io));

  app.all('*', (_req, res) => res.status(404).json({ message: 'page not found' }));

  app.use(errorMiddleware);
  return app;
};
