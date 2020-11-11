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
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      date: saleDate,
      status: 'Pendente',
    },
    products,
  );
  return res.status(201).json({ message: 'Venda processada!' });
});

const getAllSales = rescue(async (req, res, _next) => {
  if (req.user.role === 'administrator') {
    const sales = await salesServices.getAllSales();
    return res.status(200).json(sales);
  }

  const sales = await salesServices.getAllUserSales(req.user.id);
  return res.status(200).json(sales);
});

const getSaleDetails = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error } = salesServices.idSchema.validate(id);

  if (error) return next(Boom.badRequest(error.message));

  const sale = await salesServices.getSale(id);
  if (!sale) return next(Boom.notFound('não foi possível pegar essa compra'));
  if (sale.error) return next(Boom.internal(sale.message));

  if (req.user.role !== 'administrator' && req.user.id !== sale.userId) {
    return next(Boom.unauthorized('Você nao tem permissão para ver essa compra'));
  }

  return res.status(200).json(sale);
});

const updateSale = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const { io } = req;

  const { id: userId, role } = req.user;

  const { error } = await salesServices.confirmOwnerShip(userId, id, role);

  if (error) return next(Boom.unauthorized(error.message));

  await salesServices.deliverySale(id, status);

  io.emit('Status', { id, status });

  return res.status(200).json({ message: 'Entregue!' });
});

module.exports = {
  createSale,
  getAllSales,
  getSaleDetails,
  updateSale,
};
