const { salesProducts, products } = require('../models');

const getDetails = async (orderNumber) => {
  const orderDetails = await salesProducts.findAll({ where: { sale_id: orderNumber } });
  console.log(orderDetails);
  const details = orderDetails.map(async ({ quantity, product_id: productId }) => {
    // console.log(await products.findByPk(productId));
    const { name, price } = await products.findByPk(productId);
    // const totalPrice = Number(price) * quantity;
    // return { quantity, name, price: totalPrice };
    return { quantity, name, price };
  });
  const promise = await Promise.all(details);
  return promise;
};

module.exports = { getDetails };
