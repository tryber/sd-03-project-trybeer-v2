const { Op } = require('sequelize');
const { salesProducts, products, sales, users } = require('../models');

const getDetails = async (orderNumber, userEmail) => {
  const orderDetails = await salesProducts.findAll({ where: { sale_id: orderNumber } });
  const findId = await users.findAll({ where: { email: userEmail } });
  const { id } = findId[0];
  console.log(orderNumber);
  console.log(id);

  const saleInfo = await sales.findAll(
    { where: { [Op.and]: [{ user_id: id }, { id: orderNumber }] } },
  );

  const details = orderDetails.map(async ({ quantity, product_id: productId }) => {
    const { name, price } = await products.findByPk(productId);
    return { quantity, name, price, saleInfo };
  });
  const promise = await Promise.all(details);
  return promise;
};

module.exports = { getDetails };
