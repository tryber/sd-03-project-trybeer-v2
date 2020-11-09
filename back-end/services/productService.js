const { product } = require('../models');

const GetAllProducts = async () => {
  const products = await product.findAll();
  return products.map(({
    dataValues: { id, name, price, url_image: urlImage },
  }) => ({ id, name, price, urlImage }));
};

module.exports = {
  GetAllProducts,
};
