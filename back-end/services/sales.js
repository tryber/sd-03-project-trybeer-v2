const Joi = require('@hapi/joi');
const Models = require('../models');

const idSchema = Joi.number()
  .integer()
  .positive()
  .required()
  .error(() => new Error('user id inválido'));

const totalPriceSchema = Joi.number()
  .positive()
  .required()
  .error(() => new Error('preço total inválido'));

const deliveryAddressSchema = Joi.string()
  .required()
  .error(() => new Error('endereço necessário'));

const saleDateSchema = Joi.date()
  .required()
  .error(() => new Error('data inválida'));

const productObjSchema = Joi.object()
  .keys({
    id: Joi.number()
      .integer()
      .positive()
      .required()
      .error(() => new Error('product id inválido')),
    sellingQnt: Joi.number()
      .integer()
      .positive()
      .required()
      .error(() => new Error('quantidade inválida')),
  })
  .unknown(true);

const productsSchema = Joi.array().min(1)
  .items(productObjSchema);

const checkoutSchema = Joi.object({
  userId: idSchema,
  totalPrice: totalPriceSchema,
  deliveryAddress: deliveryAddressSchema,
  deliveryNumber: deliveryAddressSchema,
  saleDate: saleDateSchema,
  products: productsSchema,
});

const addSale = async (saleObj, sellProducts) => {
  const products = sellProducts.map(({ sellingQnt, id }) => ({
    id,
    name: 'cocacola',
    url_image: 'um link qualquer',
    price: 12.99,
    sales_products: { quantity: sellingQnt },
  }));

  // const venda = {
  //   ...saleObj,
  //   products,
  // };
  // console.log('services add sale 1', venda);

  // return Models.sales
  //   .create({ ...saleObj, products }, { include: { model: Models.products, as: 'products' } })
  //   .then((sale) => {
  //     console.log('end sale', sale);
  //   });
  return Models.sales
    .create(saleObj)
    .then((sale) => {
      Promise.all(sellProducts.map(({ id, sellingQnt }) =>
        Models.sales_products.create(
          { sale_id: sale.id, product_id: id, quantity: sellingQnt }
        )));
    }).then((res) => console.log('res', res));
};

const getAll = async (id) => id
  ? Models.sales.findAll({ where: { id } })
  : Models.sales.findAll();

const getSale = async (id) => {
  const sale = await Models.sales.findByPk(
    id, { include: { model: Models.products, as: 'products' } }
  );
  if (!sale) return { error: true, message: 'Compra não encontrada' };
  return sale.dataValues;
};

const deliverySale = async (id, status) => {
  const [updated] = await Models.sales.update({ status }, { where: { id } });
  if (!updated) return { error: true, message: 'não foi possível atualizar o produto' };
  return { error: false };
};

const confirmOwnerShip = async (userRequestId, saleId) => {
  const { user_id } = await Models.sales.findByPk(saleId);
  console.log(userRequestId, user_id);
  if (userRequestId !== user_id) return { error: true, message: 'Essa compra não é sua' };
  return { ok: true };
};

module.exports = {
  idSchema,
  checkoutSchema,
  addSale,
  getAll,
  getSale,
  deliverySale,
  confirmOwnerShip,
};
