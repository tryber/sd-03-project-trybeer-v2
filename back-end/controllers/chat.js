const { Router } = require('express');
const { getAllMessages } = require('../dbMongo/modelSaveMessage');

const chat = Router();

chat.get('/', async (req, res) => {
  const chatHistory = await getAllMessages();
  console.log(chatHistory);
  res.status(200).json(chatHistory);
});

module.exports = chat;
