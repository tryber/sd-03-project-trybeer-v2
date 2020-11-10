const { salesProducts, products, sales, users } = require('../models');

const getDetails = async (orderNumber, userEmail) => {
  let statusCLient;

  const orderDetails = await salesProducts.findAll({ where: { sale_id: orderNumber } });
  const findId = await users.findAll({ where: { email: userEmail } });
  const { id } = findId[0];

  await sales.findAll({ where: { user_id: id } }).then((result) => result.map((e) => {
    statusCLient = e.dataValues.status;
    return statusCLient;
  }));

  const details = orderDetails.map(async ({ quantity, product_id: productId }) => {
    const { name, price } = await products.findByPk(productId);
    return { quantity, name, price, statusCLient };
  });
  const promise = await Promise.all(details);
  return promise;
};

module.exports = { getDetails };
