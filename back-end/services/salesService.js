const { sales, salesProducts, products } = require('../models');

const getAll = async () => {
  const [results] = await sales.findAll();
  if (!results) {
    return { error: 'no_sales' };
  }
  return results;
};

const updateSale = async (id, status) => {
  const [update] = await sales.update({ where: { id } }, { status });
  return update;
};

const getSaleById = async (id) => {
  if (!parseInt(id, 10)) return { error: 'invalid_id' };
  const sale = await sales.findByPk(id, {
    include: {
      model: products,
      as: 'products',
    },
  });
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

    const result = await sales.create({
      user_id: user.id,
      total_price: total,
      delivery_address: street,
      delivery_number: streetNumber,
      sale_date: timeStamp.toISOString().replace('Z', '')
        .replace('T', ' '),
      status: 'Pendente',
    });

    const saleId = result.dataValues.id;
    console.log(result.dataValues);
    if (saleId) {
      const serializeCart = cart.map(
        ({ id, quantity }) => ({
          sale_id: saleId,
          product_id: id,
          quantity,
        }),
      );
      console.log('serializeCart:', serializeCart);

      const test = await salesProducts.bulkCreate(serializeCart).catch((e) => console.log(e));
      console.log('não parei de rodar');
      console.log(test);
    }
  } catch (e) {
    console.log(e);
    return { error: 'internal_error' };
  }
};

const getSaleByUser = async (id) => {
  try {
    const sale = await sales.findAll({ where: { user_id: id } });
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
