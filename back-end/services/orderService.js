const orderModel = require('../models/orderModel');

const newSale = async (uId, price, address, number, products) => {
  const date = new Date().toISOString()
    .slice(0, 10);
  const saleId = await orderModel.registerSale(uId, price, address, number, date);

  products.forEach(async (product) => {
    const { id, qty } = product;

    await orderModel.registerSaleProduct(saleId, id, qty);
  });

  return saleId;
};

const getOrderDetail = async (id) => orderModel.getOrderDetail(id);

const getOrderById = async (id) => orderModel.getOrderById(id);

const updateOrder = async (id) => orderModel.updateOrder(id);

module.exports = {
  newSale,
  getOrderDetail,
  getOrderById,
  updateOrder,
};
