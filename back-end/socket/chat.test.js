const services = require('../services/index');
const chatController = require('./chat');

jest.mock('../services/');

describe('chatController', () => {
  beforeEach(() => {
    services.roomServices.getRoomByUsers.mockReset();
    services.usersServices.saveUserSocket.mockReset();
  });
  describe('Enter Chat Room', () => {
    it('room doesnt exists', async () => {
      const email = 'aaaa@aaaa.com.br';
      const role = 'client';
      const join = jest.fn();
      const socket = { join };
      const token = 'meu token';
      const dest = 'destinatário';
      const id = 1;
      services.roomServices.getRoomByUsers.mockResolvedValue(undefined);
      services.roomServices.createRoom.mockResolvedValue({ id });
      services.authServices.mockResolvedValue({ email, role });
      const enterRoom = chatController.onEnterRoom(socket);
      await enterRoom({ token, dest });
      expect(services.roomServices.getRoomByUsers).toHaveBeenCalledTimes(1);
      expect(services.roomServices.getRoomByUsers).toHaveBeenCalledWith({ email, role }, dest);
      expect(services.roomServices.createRoom).toHaveBeenCalledTimes(1);
      expect(services.usersServices.saveUserSocket).toHaveBeenCalledTimes(1);
    });
    it('room exists', async () => {
      const email = 'aaaa@aaaa.com.br';
      const role = 'client';
      const join = jest.fn();
      const emit = jest.fn();
      const socket = { join, emit };
      const token = 'meu token';
      const dest = 'destinatário';
      const message = ['Ola'];
      const id = 1;
      services.roomServices.getRoomByUsers.mockResolvedValue({ id });
      services.authServices.mockResolvedValue({ email, role });
      services.roomServices.getRoomById.mockResolvedValue({ message });
      const enterRoom = chatController.onEnterRoom(socket);
      await enterRoom({ token, dest });
      expect(services.roomServices.getRoomByUsers).toHaveBeenCalledTimes(1);
      expect(services.usersServices.saveUserSocket).toHaveBeenCalledTimes(1);
      expect(services.roomServices.getRoomById).toHaveBeenCalledTimes(1);
      expect(join).toHaveBeenCalledTimes(1);
      expect(emit).toHaveBeenCalledTimes(1);
    });
  });
  describe('on Message', () => {
    it('sending message', async () => {
      const email = 'aaaaa@aaaa.com.br';
      const room = 1;
      const time = '17:33';
      const token = 'meu token';
      const message = 'message';
      const emit = jest.fn();
      const io = { to: jest.fn().mockReturnValue({ emit }) };
      const socket = {};
      services.authServices.mockResolvedValue({ email });
      services.usersServices.findUserSocket.mockResolvedValue({ room });
      services.roomServices.getTime.mockReturnValue(time);
      const onMessage = chatController.onMessage(socket, io);
      await onMessage({ token, message });
      expect(services.authServices).toHaveBeenCalledWith(token);
      expect(services.usersServices.findUserSocket).toHaveBeenCalledWith({ email });
      expect(services.roomServices.saveMessage)
        .toHaveBeenCalledWith(room, { email }, message, time);
      expect(emit).toHaveBeenCalledWith('message', { email, message, time });
      expect(emit).toHaveBeenCalledTimes(1);
    });
  });
  describe('on Disconnect', () => {
    it('deleting on disconnecting', async () => {
      const id = 'aaa';
      const socket = { id };
      const onDisconnect = chatController.onDisconnect(socket);
      await onDisconnect();
      expect(services.usersServices.deleteUserSocket).toHaveBeenCalledWith(socket.id);
    });
  });
});
