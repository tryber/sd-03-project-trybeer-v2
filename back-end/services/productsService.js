const { productsModel } = require('../models');
const { products } = require('../models');

const getAllProducts = async () => {
  try {
    const getAll = await products.findAll({});
    console.log('object', getAll);
    return getAll;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllProducts,
};
