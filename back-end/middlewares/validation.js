const Joi = require('joi');
const { generateError } = require('../utils');

const errorCode = 400;

const schemas = {
  userSchema: Joi.object({
    name: Joi.string().min(12)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'br'],
        },
      })
      .required(),
    password: Joi.string().min(6)
      .max(12)
      .required(),
    role: Joi.string().valid('administrator', 'client')
      .required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'br'],
        },
      })
      .required(),
    password: Joi.string().min(6)
      .max(12)
      .required(),
  }),
  userUpdateSchema: Joi.object({
    name: Joi.string().min(12)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'br'],
        },
      })
      .required(),
  }),
  registrySalesSchema: Joi.object({
    userId: Joi.number().min(1)
      .max(1000000)
      .required(),
    totalPrice: Joi.number().greater(0)
      .precision(2)
      .required(),
    deliveryAddress: Joi.string().min(3)
      .max(120)
      .required(),
    deliveryNumber: Joi.string().min(1)
      .max(6)
      .required(),
    products: Joi.array().items(Joi.object({
      id: Joi.number().min(1)
        .max(1000000)
        .required(),
      name: Joi.string(),
      price: Joi.number().greater(0)
        .precision(2)
        .required(),
      urlImage: Joi.string(),
      quantity: Joi.number().min(1)
        .max(1000000)
        .required(),
    }))
      .required(),
  }),
  updateSalesStatusSchema: Joi.object({
    status: Joi.string().valid('Pendente', 'Entregue')
      .required(),
  }),
};

const validateSchema = (schema) => async (req, _res, next) => {
  try {
    await schema.validateAsync(req.body, {
      render: false,
    });

    return next();
  } catch (error) {
    return next(generateError(errorCode, error));
  }
};

module.exports = {
  schemas,
  validateSchema,
};
