const { products } = require('../models');

const getAllProducts = async () => {
  const result = await products.findAll();
  return result.map((e) => {
    const { id, name, price, url_image: urlImage } = e.dataValues;
    return { id, name, price: Number(price), urlImage };
  });
};

module.exports = { getAllProducts };
