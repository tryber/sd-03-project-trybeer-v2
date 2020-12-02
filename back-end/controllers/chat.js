const { Router } = require('express');
const { getAllMessages, getMessagesByUser } = require('../dbMongo/modelSaveMessage');

const chat = Router();

chat.get('/', async (req, res) => {
  const chatHistory = await getAllMessages();
  console.log(chatHistory);
  res.status(200).json(chatHistory);
});

chat.post('/history', async (req, res) => {
  const { userEmail } = req.body;
  const messages = await getMessagesByUser(userEmail);
  res.status(200).json({ history: messages });
});

module.exports = chat;
