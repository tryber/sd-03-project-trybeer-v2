// const model = require('../models/products');
const { products } = require('../models');

const getAllProducts = async () => {
const result = await products.findAll();
console.log(result);
}

module.exports = { getAllProducts };
