const adminController = require('./admin');
const services = require('../services');

jest.mock('../services/');

describe('Admin Controllers', () => {
  describe('getRooms', () => {
    it('should retrive all rooms', async () => {
      const rooms = [{ users: [{ email: 'bruno@gmail.com' }, 'Loja'] }];
      services.roomServices.getAllRooms.mockResolvedValue(rooms);
      const json = jest.fn();
      const next = jest.fn();
      const res = { status: jest.fn().mockReturnValue({ json }) };

      await adminController.getRooms(null, res, next);

      expect(services.roomServices.getAllRooms).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledWith(rooms);
    });
  });
});
