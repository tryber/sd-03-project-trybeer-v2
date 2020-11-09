const rescue = require('express-rescue');
const { salesService } = require('../services');
const { createFormattedDate } = require('../services/utils');

const newSale = rescue(async (req, res) => {
  const { id: userId } = req.user;
  const { products } = req.body;
  const date = createFormattedDate();
  const sale = await salesService.newSale(req.body, userId, date);

  await Promise.all(products.map(async (product) => salesService.newSaleProduct(product, sale.id)));

  res.status(201).json({ message: 'Success!' });
});

const getAllSales = rescue(async (_req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(200).json({ sales });
});

const getSaleDetails = rescue(async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  const products = await salesService.getSaleProducts(id);

  if (req.user.role !== 'administrator' && req.user.id !== sale.userId) {
    return next({ message: 'User does not have access to that sale', code: 401 });
  }

  return res.status(200).json({ ...sale, products });
});

const markAsDelivered = rescue(async (req, res) => {
  await salesService.markAsDelivered(req.body.id);
  return res.status(200).json({ message: 'Success' });
});

module.exports = { newSale, getAllSales, getSaleDetails, markAsDelivered };
