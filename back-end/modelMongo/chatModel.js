const connect = require('./connection');

const createUserHistory = async (messages, email) => connect()
  .then((db) => db.collection('messages').insertOne({ messages, email }));

const updateUserHistory = async (messages, email) => connect()
  .then((db) => db.collection('messages').updateOne({ email }, { $set: { messages } }));

const findUserByEmail = async (email) => connect()
  .then((db) => db.collection('messages').findOne({ email }));

const findAll = async () => connect()
  .then((db) => db.collection('messages').find({})
    .toArray());

module.exports = {
  createUserHistory,
  updateUserHistory,
  findUserByEmail,
  findAll,
};
