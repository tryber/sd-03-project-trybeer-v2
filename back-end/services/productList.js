const { sales, users } = require('../models');

const getPurchases = async (email) => {
  const { id: saleId } = (await users.findAll({ where: { email } }))[0];
  const productsSold = await sales.findAll({ where: { user_id: saleId } });
  const productSoldObject = productsSold.map(
    ({ id, sale_date: saleDate, total_price: totalPrice, status }) => ({
      id,
      saleDate,
      totalPrice,
      status,
    }),
  );
  return productSoldObject;
};

module.exports = { getPurchases };
