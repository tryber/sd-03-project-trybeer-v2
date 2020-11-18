const { products } = require('../models');

const listAllProducts = async () => {
  const results = await products.findAll();

  return results.map(({ dataValues: { id, price, ...data } }) => {
    const productSerialize = {
      id: parseInt(id, 10),
      price: parseFloat(price),
      ...data,
    };
    return productSerialize;
  });
};

module.exports = { listAllProducts };
