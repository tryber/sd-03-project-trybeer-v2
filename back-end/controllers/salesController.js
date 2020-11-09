const { Router } = require('express');

const { salesService } = require('../services');
const middlewares = require('../middlewares');
const { generateError } = require('../utils');

const { schemas, validateSchema } = middlewares.validation;

const sales = Router();

sales.route('/search/all').get(async (_req, res, next) => {
  try {
    const salesData = await salesService.allSales();

    if (!salesData.length) throw new Error('Sales info not found');

    return res.status(200).json({ sales: [...salesData] });
  } catch (error) {
    return next(generateError(404, error));
  }
});

sales
  .route('/search')
  .get(async (req, res, next) => {
    try {
      const { userId } = req.query;
      const salesData = await salesService.salesByUser(userId);

      if (!salesData.length) throw new Error('Sales info not found');

      return res.status(200).json({ sales: [...salesData] });
    } catch (error) {
      return next(generateError(404, error));
    }
  });

sales.route('/search/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesData = await salesService.salesDetailsById(id);

    return res.status(200).json({ sale: salesData });
  } catch (error) {
    return next(generateError(404, error));
  }
})
  .put(validateSchema(schemas.updateSalesStatusSchema), async (req, res, next) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
      const updateSalesStatus = await salesService.updateSalesStatus(id, status);

      return res.status(200).json({ statusUpdate: updateSalesStatus });
    } catch (error) {
      return next(error);
    }
  });

sales.route('/register').post(validateSchema(schemas.registrySalesSchema), async (req, res, next) => {
  try {
    const { userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber, products } = req.body;

    const registerSales = await salesService.registerSales(userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber, products);

    return res.status(200).json({ saleInfo: { ...registerSales } });
  } catch (error) {
    return next(error);
  }
});

module.exports = sales;
