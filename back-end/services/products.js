const Model = require('../models');

const getAll = async () => Model.products.findAll();

module.exports = {
  getAll,
};
