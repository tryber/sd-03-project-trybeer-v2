const { users, sales } = require('../models');

const allSales = async () => sales.findAll({});

const finishSales = async (email, total, address, number, date) => {
  const { id } = await users.findOne({ where: { email } });
  const totalToInsert = total.replace(',', '.');

  return sales.create({
    user_id: id,
    total_price: totalToInsert,
    delivery_address: address,
    delivery_number: number,
    sale_date: date,
    status: 'Pendente',
  })
    .then(({ dataValues }) => dataValues);
};

const changeStatus = async (id, status) => {
  await sales.update({ status }, { where: { id } });

  return sales.findOne({ where: { id } }).then(({ dataValues }) => dataValues);
};

module.exports = {
  allSales,
  finishSales,
  changeStatus,
};
