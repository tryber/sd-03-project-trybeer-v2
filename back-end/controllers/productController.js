const { GetAllProducts } = require('../services/productService');

const getAllProducts = async (_req, res) => {
  const products = await GetAllProducts();
  return res.status(products.status).json(products.response);
};

module.exports = {
  getAllProducts,
};
