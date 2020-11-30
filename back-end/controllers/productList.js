const { Router } = require('express');
const service = require('../services');
const auth = require('../middlewares/auth');

const productList = Router();

productList.get('/', auth, async (req, res) => {
  const { userEmail } = req;
  const products = await service.productList.getPurchases(userEmail);
  console.log(products);
  res.status(200).json({ products });
});

module.exports = productList;
