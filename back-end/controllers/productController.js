const rescue = require('express-rescue');
const { products } = require('../models');

const listAllProducts = rescue(async (_req, res) => {
  const productsList = await products.findAll();

  return res.status(200).json(productsList);
});

module.exports = {
  listAllProducts,
};
