const { Rooms } = require('../mongoModels');

const getTime = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, 0);
  const minutes = date.getMinutes().toString().padStart(2, 0);
  return `${hours}:${minutes}`;
};

const saveMessage = async (room, user, message, time) =>
  Rooms.saveMessage(room, user, message, time);

const createRoom = async ({ email, role }, user2) => {
  const user = role === 'administrator' ? 'Loja' : { role, email };
  const room = await Rooms.createRoom(user, user2);
  return room.insertedId.toString();
};

const getRoomByUsers = async (user, user2) => {
  const room = await Rooms.getUsersRoom({
    email: user.role !== 'administrator' ? user.email : user2.email,
  });
  if (!room) return null;
  const { _id: id, ...roomCleaned } = room;
  return { ...roomCleaned, id: id.toString() };
};

const getRoomById = async (room) => {
  const dbRoom = await Rooms.getRoomById(room);
  if (!dbRoom) return null;
  const { _id: id, ...roomCleaned } = dbRoom;
  return { ...roomCleaned, id: id.toString() };
};

const getAllRooms = async () => {
  const allRooms = await Rooms.getAllRooms();
  return allRooms;
};

module.exports = {
  saveMessage,
  createRoom,
  getRoomByUsers,
  getRoomById,
  getTime,
  getAllRooms,
};
