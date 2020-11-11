const { Router } = require('express');
const { productsController } = require('../controllers');

const productsRouter = Router();

productsRouter.route('/').get(productsController.getAll);

module.exports = productsRouter;
