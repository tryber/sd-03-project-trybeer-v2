const connection = require('./connection');

const getAll = async () => connection()
  .then((db) =>
    db
      .collection('messages')
      .find({})
      .project({ clientEmail: 1, messages: 1 })
      .toArray());

const appendMsgs = async (email, messages) => connection()
  .then((db) =>
    db
      .collection('messages')
      .updateOne({ clientEmail: email }, { $set: { messages } }));

const getHistory = async (email) => connection()
  .then((db) =>
    db
      .collection('messages')
      .find({ clientEmail: email })
      .toArray());

const create = async (email) => connection()
  .then((db) =>
    db
      .collection('messages')
      .insertOne({
        clientEmail: email,
        messages: [],
      }));

module.exports = {
  getAll,
  create,
  appendMsgs,
  getHistory,
};
