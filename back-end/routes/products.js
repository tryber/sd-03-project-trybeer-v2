const { Router } = require('express');
const { productsControllers } = require('../controllers');
const { authMiddleware } = require('../middleware');

const productsRouter = Router();

module.exports = (_io) => {
  productsRouter
    .get('/', authMiddleware(true), productsControllers.getAll);

  return productsRouter;
};
