const { Router } = require('express');
const { authMiddleware } = require('../middleware');
const controllers = require('../controllers/index');

const adminsRouter = Router();

module.exports = (_io) => {
  adminsRouter
    .get('/chats', authMiddleware(), controllers.adminControllers.getRooms);

  return adminsRouter;
};
