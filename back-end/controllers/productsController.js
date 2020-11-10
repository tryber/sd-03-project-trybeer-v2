const rescue = require('express-rescue');
const { productsService } = require('../services');

const getAllProducts = rescue(async (_req, res) => {
  const products = await productsService.getAllProducts();

  return res.status(200).json(products);
});

module.exports = {
  getAllProducts,
};
