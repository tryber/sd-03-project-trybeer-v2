const connection = require('./mongoConnection');

const getAllChats = async () => (
  connection().then((db) => (db).collection('messages').find({}).toArray())
);

const createChat = async (email, messages) => (
  connection()
    .then((db) => (
      db.collection('messages').insertOne({ email, messages })))
);

const saveMessage = async (email, newMessage) => (
  connection()
    .then((db) => (
      db.collection('messages').updateOne({ email }, { $set: { messages: newMessage } })))
);

module.exports = {
  getAllChats,
  createChat,
  saveMessage,
};
