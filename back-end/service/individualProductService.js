const { sales_products: SalesProducts } = require('../models');

const allSalesProduct = async () => SalesProducts.findAll({})
  .then(({ dataValues }) => dataValues);

const registerProduct = async (saleId, productId, quantity) => {
  if (!saleId || !productId || !quantity) {
    return { error: true, status: 404, message: 'Informação incompleta!' };
  }
  const register = await SalesProducts.create({ sale_id: saleId, product_id: productId, quantity });
console.log(register)
  return register;
};

module.exports = {
  allSalesProduct,
  registerProduct,
};
