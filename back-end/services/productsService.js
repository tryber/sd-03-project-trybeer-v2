const { product } = require('../models');

const getAll = async () => product.findAll({}, { raw: true });

module.exports = {
  getAll,
};
