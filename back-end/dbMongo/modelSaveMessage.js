const connect = require('./connection');

const saveMessage = async (chatMessage, nickname, timestamp) => connect()
  .then((db) => db
    .collection('messages')
    // .insertOne({ chatMessage, nickname, timestamp }))
    .update({ nickname }, { $push: { history: { nickname, chatMessage, timestamp } } }, { upsert: true }))
  .then(({ insertedId }) => ({ _id: insertedId, chatMessage, nickname, timestamp }))
  .catch((error) => error);

  const saveAdminMessage = async (chatMessage, email, timestamp, adminNick) =>
    connect()
      .then((db) => db
        .collection('messages')
        // .insertOne({ chatMessage, nickname, timestamp }))
        .updateOne({ nickname: email }, { $push: { history: { nickname: adminNick, chatMessage, timestamp } } }, { upsert: true }))
      .then(({ insertedId }) => ({ _id: insertedId, chatMessage, nickname, adminNick, timestamp }))
      .catch((error) => error);

const getAllMessages = async () => connect()
  .then((db) => db.collection('messages').find({}).toArray())
  .catch((error) => error);

  const getAllMessagesOfUser = async (nickname) => {
    return connect()
    .then((db) => db.collection('messages').findOne({ nickname }))
    .catch((error) => error);
  };

module.exports = {
  saveMessage,
  saveAdminMessage,
  getAllMessages,
  getAllMessagesOfUser,
};
