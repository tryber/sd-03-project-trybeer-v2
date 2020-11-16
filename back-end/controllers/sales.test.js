const faker = require('faker');
const Boom = require('boom');
const salesController = require('./sales');
const { salesServices } = require('../services');

jest.mock('../services/');
jest.mock('boom');

describe('Sales Controllers', () => {
  describe('createSale', () => {
    beforeEach(() => {
      salesServices.checkoutSchema.validate.mockClear();
      salesServices.addSale.mockClear();
    });
    it('should create sales and return the corrected message', async () => {
      const body = {
        totalPrice: faker.commerce.price(),
        deliveryAddress: faker.address.streetAddress(),
        deliveryNumber: faker.random.number(),
        products: [{ name: 'Guarana', price: '10.99' }],
      };
      const user = { id: faker.random.number() };
      const req = { body, user };
      const json = jest.fn();
      const next = jest.fn();
      const res = { status: jest.fn().mockReturnValueOnce({ json }) };
      salesServices.checkoutSchema.validate.mockResolvedValueOnce({ error: null });

      await salesController.createSale(req, res, next);

      expect(salesServices.addSale).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledWith({ message: 'Venda processada!' });
    });

    it('should fail if validate return error', async () => {
      const body = {
        totalPrice: faker.commerce.price(),
        deliveryAddress: faker.address.streetAddress(),
        deliveryNumber: faker.random.number(),
        products: [{ name: 'Guarana', price: '10.99' }],
      };
      const user = { id: faker.random.number() };
      const req = { body, user };
      const next = jest.fn();
      const json = jest.fn();
      const res = { status: jest.fn().mockReturnValueOnce({ json }) };
      const message = 'Teste passou';
      salesServices.checkoutSchema.validate.mockReturnValueOnce({ error: message });

      await salesController.createSale(req, res, next);

      expect(salesServices.addSale).not.toHaveBeenCalled();
      expect(json).not.toHaveBeenCalled();
      expect(Boom.badData).toHaveBeenCalledWith(message);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('getSaleDetails', () => {
    beforeEach(() => {
      salesServices.checkoutSchema.validate.mockClear();
      salesServices.addSale.mockClear();
      salesServices.idSchema.validate.mockClear();
      Boom.unauthorized.mockClear();
      salesServices.getSale.mockClear();
    });
    it('should get client sale and return the sale', async () => {
      const paramsId = faker.random.number();
      const userId = faker.random.number();
      const sale = { userId };
      const req = { params: { id: paramsId }, user: { id: userId, role: 'client' } };
      const json = jest.fn();
      const next = jest.fn();
      const res = { status: jest.fn().mockReturnValueOnce({ json }) };
      salesServices.idSchema.validate.mockResolvedValueOnce({ error: null });
      salesServices.getSale.mockResolvedValueOnce(sale);

      await salesController.getSaleDetails(req, res, next);

      expect(salesServices.getSale).toHaveBeenCalledWith(paramsId);
      expect(json).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledWith(sale);
    });

    it('should fail if validate id return error', async () => {
      const paramsId = faker.random.number();
      const userId = faker.random.number();
      const req = { params: { id: paramsId }, user: { id: userId, role: 'client' } };
      const json = jest.fn();
      const next = jest.fn();
      const res = { status: jest.fn().mockReturnValueOnce({ json }) };
      const message = 'Teste getSale Details ok';
      salesServices.idSchema.validate.mockReturnValueOnce({ error: { message } });

      const boomReturn = 'rutorno do boom';
      Boom.badRequest.mockReturnValueOnce(boomReturn);

      await salesController.getSaleDetails(req, res, next);

      expect(salesServices.idSchema.validate).toHaveBeenCalledWith(paramsId);
      expect(salesServices.getSale).not.toHaveBeenCalled();
      expect(json).not.toHaveBeenCalled();
      expect(Boom.badRequest).toHaveBeenCalledWith(message);
      expect(next).toHaveBeenCalledWith(boomReturn);
    });

    it('should block client take sale of other client', async () => {
      const paramsId = faker.random.number();
      const userId = faker.random.number();
      const req = { params: { id: paramsId }, user: { id: userId, role: 'client' } };
      const sale = { userId: userId + 1 };
      const next = jest.fn();
      const json = jest.fn();
      const res = { status: jest.fn().mockReturnValue({ json }) };
      const boomReturn = 'retorno do boom';

      salesServices.idSchema.validate.mockReturnValue({ error: null });
      Boom.unauthorized.mockReturnValue(boomReturn);
      salesServices.getSale.mockReturnValueOnce(sale);

      await salesController.getSaleDetails(req, res, next);

      expect(salesServices.getSale).toHaveBeenCalledWith(paramsId);
      expect(json).not.toHaveBeenCalled();
      expect(Boom.unauthorized).toHaveBeenCalledWith('Você nao tem permissão para ver essa compra');
      expect(next).toHaveBeenCalledWith(boomReturn);
    });
  });
});
