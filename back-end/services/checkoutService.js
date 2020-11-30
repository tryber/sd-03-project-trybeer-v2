const { sales, products, salesProducts } = require('../models');

const checkoutService = async (req, res) => {
  console.log('body aqui', req.body);
  const {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    store,
    sale_date,
    status,
  } = req.body;

  const finalStore = store.reduce((acc, e) => {
    if (acc.find((el) => el.name === e.name)) {
      return [...acc.filter((el) => el.name !== e.name),
        { name: e.name, quantity: acc.filter((el) => el.name === e.name)[0].quantity + 1 }];
    }
    return [...acc, { name: e.name, quantity: 1 }];
  }, []);
  console.log('finalStore', finalStore);

  const response = await sales.create({
    user_id: userId,
    total_price: totalPrice,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    store,
    sale_date,
    status,
  });
  const { id: saleId } = response;
  finalStore.map(async ({ name, quantity }) => {
    const { id: productId } = (await products.findAll({ where: { name } }))[0];
    salesProducts.create({
      sale_id: saleId,
      product_id: productId,
      quantity,
    });
  });

  res.status(201).send(response);
};

module.exports = checkoutService;
