const { Router } = require('express');
const service = require('../services/adminOrders');

const adminOrders = Router();

adminOrders.get('/', async (req, res) => {
  const result = await service.getOrdersAdmin();
  const orders = result.map((e) => {
    const {
      id,
      total_price: totalPrice,
      delivery_address: addressDelivery,
      delivery_number: numberDelivery,
      status,
    } = e.dataValues;
    return {
      id,
      totalPrice: Number(totalPrice),
      addressDelivery,
      numberDelivery,
      status,
    };
  });
  res.status(200).json(orders);
});

module.exports = adminOrders;
