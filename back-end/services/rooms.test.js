const faker = require('faker');
const { Rooms } = require('../mongoModels');
const {
  getTime,
  saveMessage,
  createRoom,
  getRoomByUsers,
  getAllRooms,
  getRoomById,
} = require('./rooms');

jest.mock('../mongoModels');

describe('Rooms Services', () => {
  describe('getTime', () => {
    test('should return the right format', () => {
      const time = getTime();
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('saveMessage', () => {
    beforeEach(() => {
      Rooms.saveMessage.mockReset();
    });

    test('should call Models', async () => {
      const room = 'room';
      const user = 'user';
      const message = 'message';
      const time = 'time';

      Rooms.saveMessage.mockResolvedValue('valor retornado');

      const result = await saveMessage(room, user, message, time);

      expect(Rooms.saveMessage)
        .toHaveBeenCalledWith(room, user, message, time);

      expect(result).toBe('valor retornado');
    });
  });

  describe('createRoom', () => {
    beforeEach(() => {
      Rooms.createRoom.mockReset();
    });

    test('should call models with role client and corrected', async () => {
      const email = faker.internet.email();
      const email2 = faker.internet.email();
      const role = 'client';
      const insertedId = faker.random.number();

      Rooms.createRoom.mockResolvedValue({ insertedId });

      const returned = await createRoom({ email, role }, { email: email2 });

      expect(Rooms.createRoom)
        .toHaveBeenCalledWith({ role, email }, { email: email2 });

      expect(returned).toBe(insertedId.toString());
    });

    test('should call models with administrator client and corrected loja name', async () => {
      const email = faker.internet.email();
      const email2 = faker.internet.email();
      const role = 'administrator';
      const insertedId = faker.random.number();

      Rooms.createRoom.mockResolvedValue({ insertedId });

      const returned = await createRoom({ email, role }, { email: email2 });

      expect(Rooms.createRoom)
        .toHaveBeenCalledWith('Loja', { email: email2 });

      expect(returned).toBe(insertedId.toString());
    });
  });

  describe('getRoomByUsers', () => {
    beforeEach(() => {
      Rooms.getUsersRoom.mockReset();
    });

    test('should return the client room with the correct id', async () => {
      const email = faker.internet.email();
      const user = { role: 'client', email };
      const user2 = { email: faker.internet.email() };
      const id = faker.random.number();
      const room = { _id: id, outraProp: 1 };

      Rooms.getUsersRoom.mockResolvedValue(room);
      const result = await getRoomByUsers(user, user2);

      expect(Rooms.getUsersRoom).toHaveBeenCalledWith({ email });

      expect(result.id).toBe(id.toString());
    });

    test('should return the administrator room with the correct id', async () => {
      const email = faker.internet.email();
      const user = { role: 'administrator', email: faker.internet.email() };
      const user2 = { email };
      const id = faker.random.number();
      const room = { _id: id, outraProp: 1 };

      Rooms.getUsersRoom.mockResolvedValueOnce(room);
      const result = await getRoomByUsers(user, user2);

      expect(Rooms.getUsersRoom).toHaveBeenCalledWith({ email });

      expect(result.id).toBe(id.toString());
    });

    test('should return the administrator room with the correct id', async () => {
      Rooms.getUsersRoom.mockResolvedValueOnce(null);
      const result = await getRoomByUsers({ email: '', role: '' }, { email: '' });

      expect(result).toBeNull();
    });
  });

  describe('getAllRooms', () => {
    beforeEach(() => {
      Rooms.getAllRooms.mockReset();
    });

    test('should call Models getAllRooms', async () => {
      const value = faker.helpers.randomize();
      Rooms.getAllRooms.mockResolvedValue(value);

      const result = await getAllRooms();

      expect(Rooms.getAllRooms).toHaveBeenCalled();

      expect(result).toBe(value);
    });
  });

  describe('getRoomById', () => {
    beforeEach(() => {
      Rooms.getRoomById.mockReset();
    });

    test('should return the room with the correct id', async () => {
      const id = faker.random.number();
      const room = { _id: id, outraProp: 1 };

      Rooms.getRoomById.mockResolvedValue(room);

      const result = await getRoomById(id);

      expect(Rooms.getRoomById).toHaveBeenCalledWith(id);
      expect(result.id).toBe(id.toString());
    });

    test('should return null if not room', async () => {
      const id = faker.random.number();

      Rooms.getRoomById.mockResolvedValueOnce(null);
      const result = await getRoomById(id);

      expect(result).toBeNull();
    });
  });
});
