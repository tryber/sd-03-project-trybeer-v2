const connection = require('./mongoConnection');

const getAllChats = async () => (
  connection().then((db) => (db).collection('messages').find({}).toArray())
);

const createChat = async (email, newMessage) => (
  connection()
    .then((db) => (
      db.collection('messages').insertOne({ email, messages: [newMessage] })))
);

const saveMessage = async (email, newMessage, oldMessage) => (
  connection()
    .then((db) => (
      db.collection('messages').updateOne({ email }, { $set: { messages: [...oldMessage, newMessage] } })))
);

module.exports = {
  getAllChats,
  createChat,
  saveMessage,
};
