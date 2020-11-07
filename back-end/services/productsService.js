const { products } = require('../models');

const listAllProducts = async () => {
  const results = await products.findAll();
  return results;
};

module.exports = { listAllProducts };
