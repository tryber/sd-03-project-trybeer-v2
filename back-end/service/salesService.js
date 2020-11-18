const { users, sales } = require('../models');

const allSales = async (userId) => sales.findAll({ where: { user_id: userId } })
  .then(({ dataValues }) => dataValues);

const finishSales = async (email, total, address, number, date) => {
  const { id } = await users.findOne({ where: { email } });
  const totalToInsert = total.replace(',', '.');

  await sales.create({ user_id: id, total_price: totalToInsert, delivery_address: address, delivery_number: number, sale_date: date, status: 'Pendente' });
  const UserSales = await sales.findAll({ where: { user_id: id } });
  const positionSale = (UserSales.length - 1);
  const newSale = UserSales[positionSale];

  const saleResponse = {
    userId: id,
    totalPrice: totalToInsert,
    deliveryAddress: address,
    deliveryNumber: number,
    saleDate: date,
    status: 'Pendente',
    saleId: newSale.id,
  };
  return saleResponse;
};

const changeStatus = async (id, newSatus) => {
  await sales.update({ status: { newSatus } }, { where: { user_id: id } });

  return 'ok';
};

module.exports = {
  allSales,
  finishSales,
  changeStatus,
};
