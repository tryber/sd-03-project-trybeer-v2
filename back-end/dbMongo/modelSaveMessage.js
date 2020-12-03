const connect = require('./connection');

const saveClientMessage = async (chatMessage, nickname, timestamp, from) => connect()
  .then((db) => db
    .collection('messages')
    .updateMany({ nickname }, { $push:
      { messages: { chatMessage, timestamp, from } } }, { upsert: true }))
  .then(({ insertedId }) => ({ _id: insertedId, chatMessage, nickname, timestamp, from }))
  .catch((error) => error);

const getAllMessages = async () => connect()
  .then((db) => db.collection('messages').find({})
    .toArray())
  .catch((error) => error);

const getMessagesByUser = async (nickname) => connect()
  .then((db) => db.collection('messages').findOne({ nickname }))
  .catch((error) => error);

module.exports = {
  saveClientMessage,
  getAllMessages,
  getMessagesByUser,
};
