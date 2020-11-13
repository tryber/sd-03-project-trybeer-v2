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

module.exports = {
  getAll,
  appendMsgs,
};
