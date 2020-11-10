const Boom = require('boom');
const rescue = require('express-rescue');
const { salesServices } = require('../services');

const createSale = rescue(async (req, res, next) => {
  const date = new Date();
  const { totalPrice, deliveryAddress, deliveryNumber, products } = req.body;

  const saleDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const { id: userId } = req.user;

  const { error } = salesServices.checkoutSchema.validate({
    userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, products,
  });

  if (error) return next(Boom.badData(error));

  await salesServices.addSale(
    {
      user_id: userId,
      total_price: totalPrice,
      delivery_address: deliveryAddress,
      delivery_number: deliveryNumber,
      sale_date: saleDate,
      status: 'Pendente'
    },
    products,
  );

  return res.status(201).json({ message: 'Venda processada!' });
});

const getAllSales = rescue(async (req, res, _next) => {
  const id = (req.user.role === 'administrator' ? null : req.user.id);
  const sales = await salesServices.getAll(id);
  return res.status(200).json({ sales });
});

const getSaleDetails = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error } = salesServices.idSchema.validate(id);

  if (error) return next(Boom.badRequest(error.message));

  const sale = await salesServices.getSale(id);

  if (sale.error) return next(Boom.notFound(sale.message));

  if (req.user.role !== 'administrator' && req.user.id !== sale.userId) {
    return next(Boom.unauthorized('Você nao tem permissão para ver essa compra'));
  }

  return res.status(200).json(sale);
});

const updateSale = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const { id: userId } = req.user;

  const { error } = salesServices.confirmOwnerShip(userId, id);

  if (error) return next(Boom.unauthorized(error.message));

  await salesServices.deliverySale(id, status);

  return res.status(200).json({ message: 'Entregue!' });
});

module.exports = {
  createSale,
  getAllSales,
  getSaleDetails,
  updateSale,
};
