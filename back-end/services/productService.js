const { getAllProducts } = require('../models/productModel');

const GetAllProducts = async () => {
  const products = await getAllProducts();
  return products.map(([id, name, price, urlImage]) => ({ id, name, price, urlImage }));
};

module.exports = {
  GetAllProducts,
};
