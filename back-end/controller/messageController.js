const rescue = require('express-rescue');

const { messageService } = require('../service');

const getAllChats = rescue(async (_req, res) => {
  const chats = await messageService.getAllChats();

  res.status(200).json(chats);
});

module.exports = {
  getAllChats,
};
