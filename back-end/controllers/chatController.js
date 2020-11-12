const messageModel = require('../mongoModel/messageModel');

const getAllChats = async (req, res) => {
  const result = await messageModel.getHistory();

  res.status(200).json(result);
};

module.exports = { getAllChats };
