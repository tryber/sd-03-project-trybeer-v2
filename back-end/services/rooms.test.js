const { Rooms } = require('../mongoModels');
const { getTime, saveMessage } = require('./rooms');

jest.mock('../mongoModels');

describe('Rooms Services', () => {
  // describe('getTime', () => {
  //   test('should ', () => {
  //     const time = getTime()

  //   });
  //   });

  describe('saveMessage', () => {
    beforeEach(() => {
      Rooms.saveMessage.mockReset();
    });

    test('should call Models', async () => {
      const room = 'room';
      const user = 'user';
      const message = 'message';
      const time = 'time';

      await saveMessage(room, user, message, time);
      expect(Rooms.saveMessage).toHaveBeenCalledWith(room, user, message, time);
    });
  });
});
