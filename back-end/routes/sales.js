const { Router } = require('express');
const { validateJWT } = require('../middlewares/auth');
const { salesController } = require('../controllers');

const salesRouter = Router();

salesRouter
  .route('/')
  .post(validateJWT, salesController.newSale)
  .get(salesController.getAllSales);

salesRouter.route('/:id').get(validateJWT, salesController.getSaleDetails);

salesRouter.route('/:id/delivered').put(validateJWT, salesController.markAsDelivered);

module.exports = salesRouter;
