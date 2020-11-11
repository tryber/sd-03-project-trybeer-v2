const { sale, sales_products, product } = require('../models');

const newSale = async (data, user_id, sale_date, status = 'Pendente') => sale
  .create({ ...data, user_id, sale_date, status });

const newSaleProduct = async ({ productId: product_id, quantity }, sale_id) => sales_products
  .create({ product_id, sale_id, quantity });

const getAllSales = async () => sale.findAll({}, { raw: true });

const getSaleById = async (id) => sale.findByPk(id, { include: { model: product, as: 'products' }});

const markAsDelivered = async (id) => sale.update({ status: 'Entregue' }, { where: { id } });

module.exports = {
  newSale,
  newSaleProduct,
  getAllSales,
  getSaleById,
  markAsDelivered,
};
