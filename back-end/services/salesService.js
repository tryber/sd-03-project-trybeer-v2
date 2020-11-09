const { salesModel } = require('../models');

const newSale = async (data, userId, date) => salesModel.postSale(data, userId, date);

const newSaleProduct = async (product, saleId) => salesModel.postSaleProduct(product, saleId);

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => salesModel.getSaleById(id);

const getSaleProducts = async (id) => salesModel.getSaleProducts(id);

const markAsDelivered = async (id) => salesModel.markAsDelivered(id);

module.exports = {
  newSale,
  newSaleProduct,
  getAllSales,
  getSaleById,
  getSaleProducts,
  markAsDelivered,
};
