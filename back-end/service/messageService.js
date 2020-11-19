const { messageModel } = require('../models/messageModel');

const getAllChats = async () => {
  const chat = await messageModel.getAllChats();

  return chat;
};

module.exports = {
  getAllChats,
};
