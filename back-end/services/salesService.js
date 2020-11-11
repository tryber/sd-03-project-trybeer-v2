const { sales, salesProducts, products } = require('../models');

const getAll = async () => {
  const results = await sales.findAll();
  // console.log(results);
  if (!results) {
    return { error: 'no_sales' };
  }
  const serializeOrders = results.map(
    ({
      total_price: total,
      id: saleId,
      delivery_number: number,
      delivery_address: address,
      status,
      productKey,
    }) => ({
      total,
      saleId,
      number,
      address,
      status,
      salesProducts: productKey,
    }),
  );
  return serializeOrders;
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

  const serializeSale = {
    total: sale.total_price,
    saleId: sale.id,
    number: sale.delivery_number,
    address: sale.delivery_address,
    status: sale.status,
    saleProducts: sale.products.map(
      ({
        salesProducts: saleProduct,
        id: soldProductId,
        name: productName,
        price: productPrice,
      }) => ({
        soldProductId,
        productName,
        productPrice,
        soldQuantity: saleProduct.quantity,
      }),
    ),
  };
  return serializeSale;
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

    if (saleId) {
      const serializeCart = cart.map(
        ({ id, quantity }) => ({
          sale_id: saleId,
          product_id: id,
          quantity,
        }),
      );

      await salesProducts.bulkCreate(serializeCart).catch((e) => console.log(e));
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
