const { Router } = require('express');
const { chatController } = require('../controllers');

const chat = Router();

chat.get('/', chatController.findAll);

chat.post('/', chatController.addUserMessages);

module.exports = chat;
