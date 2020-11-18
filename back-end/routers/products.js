const express = require('express');
const rescue = require('express-rescue');

const { listAll } = require('../controllers/productsController');
const validateToken = require('../middlewares/validateToken');

const products = express.Router();

products.get('/', validateToken, rescue(listAll));

module.exports = products;
