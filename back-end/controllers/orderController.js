const rescue = require('express-rescue');
const orderModel = require('../models/models/orderModel');
const orderService = require('../services/orderService');

const registerNewSale = rescue(async (req, res) => {
  const { id } = req.user;
  const { address, price, number, products } = req.body;

  const saleId = await orderService.newSale(id, price, address, number, products);

  res.status(201).json({ saleId });
});

const listAllOrders = rescue(async (_req, res) => {
  const ordersList = await orderModel.fetchOrders();

  return res.status(200).json(ordersList);
});

const getOrderDetail = rescue(async (req, res) => {
  const { id } = req.params;
  const orderDetail = await orderService.getOrderDetail(id);
  const orderById = await orderService.getOrderById(id);
  if (!orderDetail || !orderById) return res.status(404).json({ message: 'Order not found' });
  return res.status(200).json({ orderDetail, orderById });
});

const updateOrder = rescue(async (req, res) => {
  const { id } = req.params;
  await orderService.updateOrder(id);
  return res.status(200).send();
});

module.exports = {
  registerNewSale,
  listAllOrders,
  getOrderDetail,
  updateOrder,
};
