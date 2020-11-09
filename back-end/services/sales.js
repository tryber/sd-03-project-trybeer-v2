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

const addSale = async (saleObj) => Models.sales.create(saleObj);

const addToIntermediate = async (saleIntermediateInfo) => Models.sales
  .addToIntermediate(saleIntermediateInfo);

const getAll = async (id) => (id
  ? Models.sales.getAll(id)
  : Models.sales.getAllAdmin());

const getById = async (id) => Models.sales
  .getById(id)
  .then((sale) => sale
    || { error: true, message: 'Compra não encontrada' });

const getProducts = async (id) => Models.sales.getProducts(id);

const deliverySale = async (id, status) => Models.sales.updateStatus(id, status);

const confirmOwnerShip = async (userRequestId, saleId) => {
  const { userId } = await Models.sales.getById(saleId);
  if (userRequestId !== userId) return { error: true, message: 'Essa compra não é sua' };
  return { ok: true };
};

module.exports = {
  idSchema,
  checkoutSchema,
  addSale,
  addToIntermediate,
  getAll,
  getById,
  getProducts,
  deliverySale,
  confirmOwnerShip,
};
