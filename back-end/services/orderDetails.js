const { salesProducts, products, sales, users } = require('../models');

const getDetails = async (orderNumber, userEmail) => {
  let saleInfo;

  const orderDetails = await salesProducts.findAll({ where: { sale_id: orderNumber } });
  const findId = await users.findAll({ where: { email: userEmail } });
  const { id } = findId[0];
  console.log(id);

  await sales.findAll({ where: { user_id: id } }).then((result) => result.map((e) => {
    saleInfo = e.dataValues;
    return saleInfo;
  }));

  const details = orderDetails.map(async ({ quantity, product_id: productId }) => {
    const { name, price } = await products.findByPk(productId);
    return { quantity, name, price, saleInfo };
  });
  const promise = await Promise.all(details);
  return promise;
};

module.exports = { getDetails };
