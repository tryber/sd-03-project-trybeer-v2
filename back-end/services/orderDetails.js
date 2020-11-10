const { salesProducts, products } = require('../models');

const getDetails = async (orderNumber) => {
  // const orderDetails = await salesProducts.findAll({ where: { sale_id: orderNumber } });
  const orderDetails = await salesProducts.findAll({ where: { sale_id: orderNumber }, include: [{ model: products, as: 'product', through: { attributes: [] } }] });
  console.log(orderDetails);
  const details = orderDetails.map(async ({ quantity, product_id: productId }) => {
    const { name, price } = await products.findByPk(productId);
    const totalPrice = price * quantity;
    return { quantity, name, price: totalPrice };
  });
  const promise = await Promise.all(details);
  return promise;
};

module.exports = { getDetails };
