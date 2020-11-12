const messageModel = require('../mongoModel/messageModel');

const getAllChats = async (req, res) => {
  const result = await messageModel.getAll();

  res.status(200).json(result);
};

const getByEmail = async (req, res) => {
  const { email } = req.body;
  const result = await messageModel.getHistory(email);

  res.status(200).json(result);
};

module.exports = { getAllChats, getByEmail };
