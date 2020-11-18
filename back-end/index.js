require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const httpFactory = require('./http');
const socketFactory = require('./socket');
const routes = require('./routes');
const connection = require('./models/mongoConnection');

const app = httpFactory(express, routes, cors, bodyParser);

const { ioServer } = socketFactory(connection, app);

const PORT = process.env.PORT || 3005;

ioServer.listen(PORT, () => console.log(`listen on port: ${PORT}`));
