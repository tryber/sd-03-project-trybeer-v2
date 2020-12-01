const connect = require('./connection');

const saveMessage = async (chatMessage, nickname, timestamp) => connect()
  .then((db) => db
    .collection('messages')
    .updateMany({ nickname }, { $push: { history: { chatMessage, timestamp } } }, { upsert: true }))
  .then(({ insertedId }) => ({ _id: insertedId, chatMessage, nickname, timestamp }))
  .catch((error) => error);

const getAllMessages = async () => connect()
  .then((db) => db.collection('messages').find({})
    .toArray())
  .catch((error) => error);

const getMessagesByUser = async (nickname) => connect()
  .then((db) => db.collection('messages').findOne({ nickname }))
  .catch((error) => error);

module.exports = {
  saveMessage,
  getAllMessages,
  getMessagesByUser,
};
