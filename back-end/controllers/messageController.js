const messagesService = require('../services/messagesService');

const getPrivateMessages = async (id1, id2) => {
  const privateMessages = await messagesService.getPrivateMessages(id1, id2);

  if (privateMessages === null) return [];

  return privateMessages.messagesArray;
};

const savePrivateMessage = async (id1, id2, chatMessage) => {
  const currentDate = new Date();
  const formattedDate = `
    ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}
    ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}
  `;

  const privateChatRoom = await messagesService.getPrivateMessages(id1, id2);

  if (!privateChatRoom) {
    await messagesService.createPrivateChatRoomAndSaveMessage(
      id1, id2, { chatMessage, timestamp: formattedDate, from: id1 },
    );
    return;
  }

  await messagesService.savePrivateMessage(id1, id2,
    { chatMessage, timestamp: formattedDate, from: id1 });
};

module.exports = {
  getPrivateMessages,
  savePrivateMessage,
};
