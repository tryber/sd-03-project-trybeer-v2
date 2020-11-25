const { Router } = require('express');
const {
  getAllMessages,
  getAllMessagesOfUser,
} = require('../dbMongo/modelSaveMessage');

const chat = Router();

chat.post('/findOne', async (req, res) => {
  const { nickname } = req.body;
  const userHistory = await getAllMessagesOfUser(nickname);
  res.status(200).json(userHistory);
});

chat.get('/', async (req, res) => {
  const chatHistory = await getAllMessages();
  console.log(chatHistory);
  res.status(200).json(chatHistory);
});

module.exports = chat;
