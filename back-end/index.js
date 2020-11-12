const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const httpFactory = require('./httpFactory');
const socketFactory = require('./socket/index');

const server = express();
server.use(bodyParser.json());
server.use(cors());

const httpServer = http.createServer(server);

const { io } = socketFactory(httpServer);

httpFactory(server, io);

const PORT = 3001;

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
