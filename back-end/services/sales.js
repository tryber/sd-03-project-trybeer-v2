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

const addSale = async (saleObj, sellProducts) => Models.sales
  .create(saleObj)
  .then((sale) => {
    Promise.all(sellProducts.map(({ id, sellingQnt }) =>
      Models.sales_products.create(
        { sale_id: sale.id, product_id: id, quantity: sellingQnt },
      )));
  });

const getAllSales = async () => Models.sales.findAll();

const formatProduct = ({
  urlImage,
  name,
  id,
  price,
  sales_products: { dataValues: { quantity } },
}) => (
  { urlImage, name, id, price: parseFloat(price, 10), quantity: parseInt(quantity, 10) }
);

const getAllUserSales = async (userId) => Models.sales.findAll({ where: { userId } })
  .then((sales) => sales);

const getSale = async (id) => {
  const sale = await Models.sales.findByPk(
    id,
    {
      include: {
        model: Models.products,
        as: 'products',
        through: {
          attributes: ['quantity'],
        },
      },
    },
  );
  if (!sale) return { error: true, message: 'Compra não encontrada' };
  return {
    ...sale.dataValues,
    products: sale.dataValues.products.map((p) => formatProduct(p.dataValues)),
  };
};

const deliverySale = async (id, status) => {
  const [updated] = await Models.sales.update({ status }, { where: { id } });
  if (!updated) return { error: true, message: 'não foi possível atualizar o produto' };
  return { error: false };
};

const confirmOwnerShip = async (userRequestId, saleId, role) => {
  const sale = await Models.sales.findByPk(saleId);
  if (!sale) return null;
  if (userRequestId !== sale.userId && role !== 'administrator') {
    return { error: true, message: 'Essa compra não é sua' };
  }
  return sale;
};

module.exports = {
  idSchema,
  checkoutSchema,
  addSale,
  getAllUserSales,
  getAllSales,
  getSale,
  deliverySale,
  confirmOwnerShip,
};
