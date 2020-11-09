const { Router } = require('express');

const { productsService } = require('../services');
// const middlewares = require('../middlewares');
const { generateError } = require('../utils');

const products = Router();

products.route('/all').get(async (_req, res, next) => {
  try {
    const productsList = await productsService.getAllProducts();
    return res.status(200).json([...productsList]);
  } catch (error) {
    return next(generateError(401, error));
  }
});

module.exports = products;
