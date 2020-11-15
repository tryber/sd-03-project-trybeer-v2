const connection = require('./mongoConnection');

const createPrivateChatRoomAndSaveMessage = async (id1, id2, messageObj) => {
  const db = await connection();
  const savedMessage = await db.collection('messages').insertOne({
    id1,
    id2,
    messagesArray: [{ ...messageObj, sendOn: new Date() }],
  });
  return savedMessage;
};

const getPrivateMessages = async (id2, id1) => {
  const db = await connection();
  const privateMessages = await db.collection('messages').findOne(
    {
      $or: [
        {
          $and: [
            { id1 },
            { id2 },
          ],
        },
        {
          $and: [
            { id1: id2 },
            { id2: id1 },
          ],
        },
      ],
    },
  );
  return privateMessages;
};

const savePrivateMessage = async (id1, id2, messageObj) => {
  const db = await connection();
  const saveMessage = await db.collection('messages').findOneAndUpdate(
    {
      $or: [
        {
          $and: [
            { id1 },
            { id2 },
          ],
        },
        {
          $and: [
            { id1: id2 },
            { id2: id1 },
          ],
        },
      ],
    },
    {
      $push: { messagesArray: { ...messageObj, sendOn: new Date() } },
    },
  );
  return saveMessage.value;
};

const findAllMessages = async () => {
  const db = await connection();
  const saveMessage = await db.collection('messages').find({}).toArray();
  return saveMessage;
};

module.exports = {
  getPrivateMessages,
  savePrivateMessage,
  createPrivateChatRoomAndSaveMessage,
  findAllMessages,
};
