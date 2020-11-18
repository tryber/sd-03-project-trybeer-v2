const { sales_products: SalesProducts } = require('../models');

const allSalesProduct = async () => SalesProducts.findAll({});

const registerProduct = async (saleId, productId, quantity) => {
  if (!saleId || !productId || !quantity) {
    return { error: true, status: 404, message: 'Informação incompletaa!' };
  }
  const register = await SalesProducts.create({ sale_id: saleId, product_id: productId, quantity });
  return register;
};

module.exports = {
  allSalesProduct,
  registerProduct,
};
