const { product } = require('../models');

const GetAllProducts = async () => {
  const products = await product.findAll();
  if (!products) return { status: 404, message: 'Erro ao buscar produtos' };
  return { status: 200, response: products };
};

module.exports = {
  GetAllProducts,
};
