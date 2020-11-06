const productsModel = require('../models/productsModel');

const listAllProducts = async () => {
  const products = await productsModel.listAllProducts();
  return products;
};

module.exports = { listAllProducts };
