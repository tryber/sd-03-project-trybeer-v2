const express = require('express');
const rescue = require('express-rescue');

const { listAllSales, updateSaleById, getSale } = require('../controllers/salesController');
const { getAllChats, getByEmail } = require('../controllers/chatController');
const validateToken = require('../middlewares/validateToken');

const admin = express.Router();

admin.get('/orders', validateToken, rescue(listAllSales));
admin.get('/chat', validateToken, rescue(getByEmail));
admin.get('/chats', validateToken, rescue(getAllChats));
admin.get('/orders/:id', validateToken, rescue(getSale));
admin.put('/orders/:id', validateToken, rescue(updateSaleById));

module.exports = admin;
