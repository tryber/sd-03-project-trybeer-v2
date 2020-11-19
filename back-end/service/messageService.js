const messageModel = require('../MongoModel/messageModel');

const getAllChats = async () => {
  const chat = await messageModel.getAllChats();

  return chat;
};

module.exports = {
  getAllChats,
};
