// const moment = require('moment');
const chatModel = require('../mongoModels/chats');

const getAllConvos = async (_req, res) => {
  const chatList = await chatModel.getAll();
  res.status(200).json(chatList);
};

const updateConvo = async (clientEmail, messages) => {
  await chatModel.appendMsgs(clientEmail, messages);
};

module.exports = {
  getAllConvos,
  updateConvo,
};
