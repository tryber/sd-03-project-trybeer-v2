const { getAllSales, updateSaleById, getSale, getSaleInfo, checkout, getSaleByUserId, insertSaleProduct } = require('../models/salesModel');

const getAll = async () => {
  const sales = await getAllSales();
  if (!sales) {
    return { error: 'no_sales' };
  }
  return sales;
};

const updateSale = async (id, status) => {
  const update = await updateSaleById(id, status);
  return update;
};

const getSaleById = async (id) => {
  if (!parseInt(id, 10)) return { error: 'invalid_id' };
  const sale = await getSaleInfo(id);
  if (!sale) {
    return { error: 'no_sales' };
  }
  const saleProducts = await getSale(id);
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
    const saleId = await checkout(
      user.id,
      total,
      street,
      streetNumber,
      timeStamp.toISOString().replace('Z', '')
        .replace('T', ' '),
      'Pendente',
    );
    console.log(saleId);
    if (saleId) await insertSaleProduct(saleId, cart);
  } catch (e) {
    return { error: 'internal_error' };
  }
};

const getSaleByUser = async (id) => {
  try {
    const sale = await getSaleByUserId(id);
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
