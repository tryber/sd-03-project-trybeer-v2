// const model = require('../models/products');
const { products } = require('../models');

const getAllProducts = async () => {
const result = await products.findAll();
return result.map((e) => e.dataValues);
}

module.exports = { getAllProducts };
