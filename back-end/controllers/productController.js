const rescue = require('express-rescue');
const productModel = require('../models/productModel');

const listAllProducts = rescue(async (_req, res) => {
  const productsList = await productModel.fetchAllProducts();

  return res.status(200).json(productsList);
});

module.exports = {
  listAllProducts,
};
