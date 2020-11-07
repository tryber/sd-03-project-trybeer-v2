const { sales, salesProducts } = require('../models');

const getAll = async () => {
  const results = await sales.findAll();
  if (!results) {
    return { error: 'no_sales' };
  }
  return results;
};

const updateSale = async (id, status) => {
  const update = await sales.update({ id }, { status });
  return update;
};

const getSaleById = async (id) => {
  if (!parseInt(id, 10)) return { error: 'invalid_id' };
  const sale = await sales.findByPk(id);
  if (!sale) {
    return { error: 'no_sales' };
  }
  const saleProducts = await sales.findByPk(id);
  const fullSale = { ...sale, saleProducts };

  return fullSale;
};

function cartTotal(cart) {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

const finishSale = async (user, order) => {
  try {
    const { cart, street, streetNumber } = order;
    const timeStamp = new Date();
    const total = cartTotal(cart);
    const saleId = await sales.create(
      user.id,
      total,
      street,
      streetNumber,
      timeStamp.toISOString().replace('Z', '')
        .replace('T', ' '),
      'Pendente',
    );
    console.log(saleId);
    if (saleId) await salesProducts.create({ sale_id: saleId, cart });
  } catch (e) {
    return { error: 'internal_error' };
  }
};

const getSaleByUser = async (id) => {
  try {
    const sale = await sales.findAll({ where: { id } });
    return sale;
  } catch (e) {
    console.error(e);
    return { error: 'invalid_id' };
  }
};

module.exports = {
  getAll,
  updateSale,
  getSaleById,
  finishSale,
  getSaleByUserId: getSaleByUser,
};
