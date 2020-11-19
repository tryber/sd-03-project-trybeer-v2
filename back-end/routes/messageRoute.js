const express = require('express');
const { messageController } = require('../controller');

const router = express.Router();

router.get('/', messageController.getAllChats);

module.exports = router;
