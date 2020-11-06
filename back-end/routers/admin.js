const express = require('express');
const rescue = require('express-rescue');

const { listAllSales, updateSaleById, getSale } = require('../controllers/salesController');
const validateToken = require('../middlewares/validateToken');

const admin = express.Router();

admin.get('/orders', validateToken, rescue(listAllSales));
admin.get('/orders/:id', validateToken, rescue(getSale));
admin.put('/orders/:id', validateToken, rescue(updateSaleById));

module.exports = admin;
