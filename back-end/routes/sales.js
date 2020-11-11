const { Router } = require('express');
const { salesControllers } = require('../controllers');
const { authMiddleware, ioMiddleware } = require('../middleware');

const salesRouter = Router();

module.exports = (io) => {
  salesRouter
    .get('/:id', authMiddleware(true), salesControllers.getSaleDetails)
    .post('/', authMiddleware(true), salesControllers.createSale)
    .get('/', authMiddleware(true), salesControllers.getAllSales)
    .put('/:id', authMiddleware(true), ioMiddleware(io), salesControllers.updateSale);

  return salesRouter;
};
