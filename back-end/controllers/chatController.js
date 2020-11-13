const rescue = require('express-rescue');
const services = require('../services');

const addUserMessages = rescue(async (req, res) => {
  const { messages, email } = req.body;

  await services.chatService.addUserMessages(messages, email);

  res.status(201).end();
});

const findAll = rescue(async (_req, res) => {
  const allMessages = await services.chatService.findAll();

  res.status(200).json(allMessages);
});

module.exports = {
  findAll,
  addUserMessages,
};
