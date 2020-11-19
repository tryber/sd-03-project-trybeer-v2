const chatModel = require('../mongoModels/chats');

const getAllConvos = async (_req, res) => {
  const chatList = await chatModel.getAll();
  res.status(200).json(chatList);
};

const getConvoMsgs = async (req, res) => {
  const chatMsgs = await chatModel.getHistory(req.params.email);
  if (chatMsgs.length === 0) return res.status(404).json({ message: 'Sem histórico' });
  res.status(200).json(chatMsgs);
};

const createConvo = async (req, res) => {
  const newChat = await chatModel.create(req.params.email);
  res.status(200).json(newChat);
};

const updateConvo = async (req, res) => {
  const { email } = req.params;
  const { messages } = req.body;
  await chatModel.appendMsgs(email, messages);
  res.status(200).json({ message: 'Histórico atualizado' });
};

module.exports = {
  getAllConvos,
  getConvoMsgs,
  createConvo,
  updateConvo,
};
