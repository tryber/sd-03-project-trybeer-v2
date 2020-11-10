const { Router } = require('express');
const service = require('../services/adminOrders');

const adminOrders = Router();

adminOrders.get('/', async (req, res) => {
  const result  = await service.getOrdersAdmin();
  const orders = result.map((e) =>  e.dataValues);
  console.log(orders);
  res.status(200).json(orders);
});

module.exports = adminOrders;
