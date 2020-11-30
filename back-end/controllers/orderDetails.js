const { Router } = require('express');
const service = require('../services');
const auth = require('../middlewares/auth');

const orderDetails = Router();

orderDetails.get('/:id', auth, async (req, res) => {
  const userId = req.userEmail;
  const { id } = req.params;
  console.log('orderDetails', userId, id);
  const details = await service.orderDetails.getDetails(id, userId);
  return res.status(200).json({ details });
});

module.exports = orderDetails;
