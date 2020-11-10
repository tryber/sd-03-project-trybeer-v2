const { sales, sales_products: salesProducts, products } = require('../models');

const registerSale = async (
  userId,
  totalPrice,
  delivery,
  saleDate,
  status,
  saledProducts,
) => {
  const { address, number } = delivery;

  const sale = await sales.create({
    user_id: userId,
    total_price: totalPrice,
    delivery_address: address,
    delivery_number: number,
    sale_date: saleDate,
    status,
  });

  const saleId = sale.id;

  if (!sale) {
    return {
      err: {
        code: 'invalid_entries',
        message: 'The sale could not be registered',
      },
    };
  }

  await Promise.all(
    saledProducts.map(({ id, amount }) =>
      salesProducts.create({
        sale_id: saleId,
        product_id: id,
        quantity: amount,
      })),
  );

  return { message: 'Compra realizada com sucesso!' };
};

const salesDetailsById = async (saleId) => {
  try {
    const result = await sales.findByPk(saleId, {
      include: {
        model: products,
        as: 'products',
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrders = async () => sales.findAll();

const getAllClientOrders = async (userId) =>
  sales.findAll({ where: { user_id: userId }, raw: true });

const updateOrderStatus = async (id, status) =>
  sales.update({ status }, { where: { id } });

module.exports = {
  registerSale,
  getAllOrders,
  getAllClientOrders,
  salesDetailsById,
  updateOrderStatus,
};
