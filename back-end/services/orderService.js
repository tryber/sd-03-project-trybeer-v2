const { sales, sales_products: salesProducts } = require('../models');

const newSale = async (uId, price, address, number, products) => {
  const sale = await sales.create({
    user_id: uId,
    total_price: price,
    delivery_address: address,
    delivery_number: number,
    status: 'Pendente',
  });

  products.forEach(async (product) => {
    const { id, qty } = product;

    await salesProducts.create({ sale_id: sale.id, product_id: id, quantity: qty });
  });

  return sale.id;
};

const updateOrder = async (id) => sales.update({ status: 'Entregue' }, { where: { id } });

const inProgressOrder = async (id) => sales.update({ status: 'Preparando' }, { where: { id } });

module.exports = {
  newSale,
  updateOrder,
  inProgressOrder,
};
