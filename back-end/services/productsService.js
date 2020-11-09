const { products } = require('../models');

const getAllProducts = async () => products.findAll({ raw: true });

module.exports = {
  getAllProducts,
};
