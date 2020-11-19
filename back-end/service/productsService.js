const { products } = require('../models');

const allProducts = async () => products.findAll({});

module.exports = {
  allProducts,
};
