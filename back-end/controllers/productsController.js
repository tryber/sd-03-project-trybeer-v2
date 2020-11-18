const { listAllProducts } = require('../services/productsService');

const listAll = async (_req, res) => {
  const products = await listAllProducts();
  return res.status(200).json(products);
};

module.exports = { listAll };
