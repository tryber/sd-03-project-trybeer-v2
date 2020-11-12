const { ObjectId } = require('mongodb');
const { connectTo } = require('./mongoConnection');

const createRoom = async (user1, user2) => connectTo('rooms')
  .then((coll) => coll.insertOne({ users: [user1, user2], messages: [] }));

const getUsersRoom = async ({ email }) => connectTo('rooms')
  .then((coll) => coll.findOne({ 'users.email': email }));

const saveMessage = async (room, user, message) => connectTo('rooms')
  .then((coll) => coll.updateOne(
    { _id: ObjectId(room) },
    { $push: { messages: { email: user.email, message } } },
  ));

const getRoomById = async (id) => connectTo('rooms')
  .then((coll) => coll.findOne({ _id: ObjectId(id) }));

module.exports = {
  saveMessage,
  createRoom,
  getUsersRoom,
  getRoomById,
};
