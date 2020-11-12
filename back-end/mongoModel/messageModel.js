const connect = require('./connection');

const insert = async (message, email) => {
  const db = await connect();
  const chat = await db.collection('messages').findOne({ email });

  if (!chat) {
    db.collection('messages').insertOne({
      email,
      messages: [message],
    });
  }

  db.collection('messages').updateOne(
    { email },
    { $push: {
      messages: message,
    } },
  );
};

const getHistory = async (email) => connect().then(
  (db) => db.collection('messages').findOne({ email }),
);

module.exports = { getHistory, insert };
