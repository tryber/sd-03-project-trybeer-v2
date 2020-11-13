const { sale, sales_products, product } = require('../models');

const newSale = async (data, userId, saleDate, status = 'Pendente') => sale
  .create({ ...data, user_id: userId, sale_date: saleDate, status });

const newSaleProduct = async ({ productId, quantity }, saleId) => sales_products
  .create({ product_id: productId, sale_id: saleId, quantity });

const getAllSales = async () => sale.findAll({}, { raw: true });

const getSaleById = async (id) => sale.findByPk(id, { include: { model: product, as: 'products' } });

const markAsDelivered = async (id, value) => sale.update({ status: value }, { where: { id } });

module.exports = {
  newSale,
  newSaleProduct,
  getAllSales,
  getSaleById,
  markAsDelivered,
};
