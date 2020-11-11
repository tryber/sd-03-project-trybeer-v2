const rescue = require('express-rescue');
const orderService = require('../services/orderService');
const { sales, products } = require('../models');

const registerNewSale = rescue(async (req, res) => {
  const { id } = req.user;
  const { address, price, number, products: Products } = req.body;

  const saleId = await orderService.newSale(id, price, address, number, Products);

  res.status(201).json({ saleId });
});

const listAllOrders = rescue(async (_req, res) => {
  const ordersList = await sales.findAll();

  return res.status(200).json(ordersList);
});

const getOrderDetail = rescue(async (req, res) => {
  const { id } = req.params;
  const orderDetail = await sales.findByPk(id, { include: [{ model: products, as: 'products' }] });
  if (!orderDetail) return res.status(404).json({ message: 'Order not found' });
  return res.status(200).json(orderDetail);
});

const updateOrder = rescue(async (req, res) => {
  const { id } = req.params;
  await orderService.updateOrder(id);
  return res.status(200).send();
});

const updateInProgressOrder = rescue(async (req, res) => {
  const { id } = req.params;
  await orderService.inProgressOrder(id);
  return res.status(200).send();
});

module.exports = {
  registerNewSale,
  listAllOrders,
  getOrderDetail,
  updateOrder,
  updateInProgressOrder,
};
