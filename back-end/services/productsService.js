const models = require('../models');

const getAll = async () => models.product.getAll();

module.exports = {
  getAll,
};
