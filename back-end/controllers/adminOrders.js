const { Router } = require('express');
const service = require('../services/adminOrders');

const adminOrders = Router();

adminOrders.get('/', async (req, res) => {
  const result = await service.getOrdersAdmin();
  const orders = result.map((e) => {
    const { id, total_price, delivery_address, delivery_number, status } = e.dataValues;
    return {
      id,
      totalPrice: Number(total_price),
      addressDelivery: delivery_address,
      numberDelivery: delivery_number,
      status,
    };
  });
  res.status(200).json(orders);
});

module.exports = adminOrders;
