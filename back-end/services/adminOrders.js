const { sales } = require('../models');

const getOrdersAdmin = async () => sales.findAll();

module.exports = { getOrdersAdmin };
