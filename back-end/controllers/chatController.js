const chatModel = require('../mongoModels/chats');

const getAllConvos = async (_req, res) => {
  const chatList = await chatModel.getAll();
  res.status(200).json(chatList);
};

const getConvoMsgs = async (req, res) => {
  const chatMsgs = await chatModel.getChatHistory(req.params.email);
  res.status(200).json(chatMsgs);
};

const updateConvo = async (clientEmail, messages) => {
  await chatModel.appendMsgs(clientEmail, messages);
};

module.exports = {
  getAllConvos,
  getConvoMsgs,
  updateConvo,
};
