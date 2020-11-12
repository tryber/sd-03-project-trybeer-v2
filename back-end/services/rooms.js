const { Rooms } = require('../mongoModels');

const saveMessage = async (room, user, message) => Rooms.saveMessage(room, user, message);

const createRoom = async (user1, user2) => {
  const room = await Rooms.createRoom(user1, user2);
  return room.insertedId.toString();
};

const getRoomByUsers = async (user1, user2) => {
  const room = await Rooms.getUsersRoom(user1, user2);
  if (!room) return null;
  const { _id: id, ...roomCleaned } = room;
  return { ...roomCleaned, id: id.toString() };
};

const getRoomById = async (room) => {
  const dbRoom = await Rooms.getRoomById(room);
  if (!room) return null;
  const { _id: id, ...roomCleaned } = dbRoom;
  return { ...roomCleaned, id: id.toString() };
};

module.exports = {
  saveMessage,
  createRoom,
  getRoomByUsers,
  getRoomById,
};
