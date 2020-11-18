const connection = require('./connection');

const getAll = async () => connection()
  .then((db) =>
    db
      .collection('chats')
      .find({})
      .project({ clientEmail: 1, messages: 1 })
      .toArray());

const appendMsgs = async (email, messages) => connection()
  .then((db) =>
    db
      .collection('chats')
      .updateOne({ clientEmail: email }, { $set: { messages } }));
      
const getHistory = async (email) => connection()
  .then((db) =>
  db
    .collection('chats')
    .find({ clientEmail: email })
    .toArray());
      
const create = async (email) => connection()
  .then((db) =>
    db
      .collection('chats')
      .insertOne({
        clientEmail: email,
        messages: []
      }));
  
module.exports = {
  getAll,
  create,
  appendMsgs,
  getHistory,
};
