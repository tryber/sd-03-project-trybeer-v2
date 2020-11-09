// const { getDetailByOrderId, getStatusOrderById } = require('../models/salesModel');
const productService = require('./products');
const { users, sales, salesProducts } =  require('../models');

const adminOrderDetailService = async (req, res) => {
  const { id } = req.params;
  const result = await salesProducts.findAll({ where: { sale_id: id }}); // getDetailByOrderId(id);

  if (result) {
    const products = await productService.getAllProducts();
    const orderStatus = await sales.findAll({ where: { id }}); // getStatusOrderById(id);
    console.log(orderStatus);
    let orderProducts = [];
    result.map((e) => {
      orderProducts = [
        ...orderProducts,
        Object.assign(
          ...products.filter((p) => p.id === e.productId),
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
