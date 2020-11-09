const { productsModel } = require('../models');

const getAllProducts = async () => {
  try {
    const products = await productsModel.getAllProducts();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllProducts,
};
