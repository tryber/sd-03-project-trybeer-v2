const rescue = require('express-rescue');
const { individualProductService } = require('../service');

const allSalesProduct = rescue(async (_req, res) => {
  const salesProducts = await individualProductService.allSalesProduct();

  res.status(200).json(salesProducts);
});

const registerProduct = rescue(async (req, res, next) => {
  const { saleId, productId, quantity } = req.body;

  const NewRegister = await individualProductService.registerProduct(saleId, productId, quantity);

  if (NewRegister.error) return next(NewRegister);

  res.status(200).json();
});

module.exports = {
  allSalesProduct,
  registerProduct,
};
