const messagesService = require('../services/messagesService');

const getPrivateMessages = async (id1, id2) => {
  const privateMessages = await messagesService.getPrivateMessages(id1, id2);

  if (privateMessages === null) return [];

  return privateMessages.messagesArray;
};

const savePrivateMessage = async (id1, id2, chatMessage, timestamp) => {
  const privateChatRoom = await messagesService.getPrivateMessages(id1, id2);

  if (!privateChatRoom) {
    await messagesService.createPrivateChatRoomAndSaveMessage(
      id1, id2, { chatMessage, timestamp, from: id1 },
    );
    return;
  }

  await messagesService.savePrivateMessage(id1, id2,
    { chatMessage, timestamp, from: id1 });
};

const findAllMessages = async () => {
  const messages = await messagesService.findAllMessages();
  return messages;
};

module.exports = {
  getPrivateMessages,
  savePrivateMessage,
  findAllMessages,
};
