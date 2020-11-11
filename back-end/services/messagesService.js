const messagesModel = require('../mongoModels/messagesModel');

const getPrivateMessages = async (id1, id2) => {
  const privateMessages = await messagesModel.getPrivateMessages(id1, id2);
  return privateMessages;
};

const createPrivateChatRoomAndSaveMessage = async (id1, id2, messageObj) => {
  const savedMessage = await messagesModel.createPrivateChatRoomAndSaveMessage(
    id1, id2, messageObj,
  );
  return savedMessage;
};

const savePrivateMessage = async (id1, id2, messageObj) => {
  const savedMessage = await messagesModel.savePrivateMessage(id1, id2, messageObj);
  return savedMessage;
};

module.exports = {
  getPrivateMessages,
  createPrivateChatRoomAndSaveMessage,
  savePrivateMessage,
};
