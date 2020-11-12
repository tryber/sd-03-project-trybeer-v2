const Rooms = require('./Rooms');
const Users = require('./Users');

module.exports = {
  Rooms,
  Users: new Users(),
};
