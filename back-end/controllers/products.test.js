const productsController = require('./products');
const services = require('../services');

jest.mock('../services/');

describe('Products Controllers', () => {
  describe('getAll', () => {
    it('should retrive all products', async () => {
      const products = [{ name: 'Guarana', price: '10.99' }];
      services.productsServices.getAll.mockResolvedValue(products);
      const json = jest.fn();
      const next = jest.fn();
      const res = { status: jest.fn().mockReturnValue({ json }) };

      await productsController.getAll(null, res, next);

      expect(services.productsServices.getAll).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledWith({ products });
    });
  });
});
