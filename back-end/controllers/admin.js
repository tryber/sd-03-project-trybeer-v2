const rescue = require('express-rescue');
const { roomServices } = require('../services/index');

const getRooms = rescue(async (req, res) => {
  const rooms = await roomServices.getAllRooms();
  res.status(200).json(rooms);
});

module.exports = {
  getRooms,
};
