const { products, sales, salesProducts } = require('../models');

const getDetails = async (orderNumber) => {
  const orderDetails = await salesProducts.findAll({ where: { sale_id: orderNumber } });
  const { sale_id: saleId } = orderDetails[0].dataValues;
  const { status } = (await sales.findAll({ where: { id: saleId } }))[0].dataValues;
  const details = orderDetails.map(async ({ quantity, product_id: productId }) => {
    const { name, price } = await products.findByPk(productId);
    return { quantity, name, price, status };
  });
  const promise = await Promise.all(details);
  return promise;
};

module.exports = { getDetails };
