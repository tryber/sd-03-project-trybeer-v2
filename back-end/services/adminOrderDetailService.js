const productService = require('./products');
const { sales, salesProducts } =  require('../models');

const adminOrderDetailService = async (req, res) => {
  const { id } = req.params;
  const saleFound = (await salesProducts.findAll({ where: { sale_id: id }}));
  const result = saleFound.map((e) => e.dataValues);
  if (result) {
    const products = await productService.getAllProducts();
    const { status: orderStatus = dataValues } = (await sales.findAll({ where: { id }}))[0];
    let orderProducts = [];
    result.map((e) => {
      orderProducts = [
        ...orderProducts,
        Object.assign(
          ...products.filter((p) => p.id === e.product_id),
          { quantity: e.quantity },
        ),
      ];
      return orderProducts;
    });
    res.status(200).send({ orderProducts, orderStatus });
  } else {
    res.status(404).send({ message: 'Order not found', code: 'not_found' });
  }
};

module.exports = adminOrderDetailService;
