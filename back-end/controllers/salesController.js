const rescue = require('express-rescue');
const { salesService } = require('../services');

const registerSale = rescue(async (req, res) => {
  const { userId, totalPrice, delivery, saleDate, status, products } = req.body;

  const sale = await salesService.registerSale(
    userId,
    totalPrice,
    delivery,
    saleDate,
    status,
    products,
  );

  if (sale.err) return res.status(422).json(sale);

  return res.status(201).json(sale);
});

const getOneOrder = rescue(async (req, res) => {
  const { id } = req.params;
  const salesData = await salesService.salesDetailsById(id);

  return res.status(200).json({ sale: salesData });
});

const getAllOrders = rescue(async (_req, res) => {
  const orders = await salesService.getAllOrders();

  return res.status(200).json(orders);
});

const getAllClientOrders = rescue(async (req, res) => {
  const { id } = req.query;

  const orders = await salesService.getAllClientOrders(id);

  return res.status(200).json(orders);
});

const updateOrderStatus = rescue(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await salesService.updateOrderStatus(id, status);
  const updatedOrder = await salesService.salesDetailsById(id);
  return res.status(200).json(updatedOrder);
});

module.exports = {
  registerSale,
  getOneOrder,
  getAllOrders,
  getAllClientOrders,
  updateOrderStatus,
};
