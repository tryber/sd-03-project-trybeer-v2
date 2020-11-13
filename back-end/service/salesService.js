const { users, sales } = require('../models');

const allSales = async () => sales.findAll({});

const finishSales = async (email, total, address, number, date) => {
  const { id } = await users.findOne({ where: { email } });
  const totalToInsert = total.replace(',', '.');

  const { dataValues } = await sales.create({ user_id: id, total_price: totalToInsert, delivery_address: address, delivery_number: number, sale_date: date, status: 'pending' });
  const UserSales = await sales.findAll({ where: { user_id: id } });
  console.log(UserSales)
  const positionSale = (UserSales.length - 1);
  const newSale = UserSales[positionSale];

  const saleResponse = {
    ...dataValues,
    saleId: newSale.id,
  };
console.log(saleResponse)
  //return saleResponse;
};
// 
// const changeStatus = async (id) => {
//   await salesModel.changeStatus(id, 'Entregue');
// 
//   return 'ok';
// };

module.exports = {
  allSales,
  finishSales,
};
