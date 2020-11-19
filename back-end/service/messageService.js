<<<<<<< HEAD
const messageModel = require('../models/messageModel');
=======
const messageModel = require('../MongoModel/messageModel');
>>>>>>> 6c229c450a01f84ea281204fac84a4f591d80d78

const getAllChats = async () => {
  const chat = await messageModel.getAllChats();

  return chat;
};

module.exports = {
  getAllChats,
};
