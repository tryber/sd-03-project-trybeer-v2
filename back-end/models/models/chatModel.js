const connection = require('./connectionMdb');

const listRoomMessages = async (email) => {
  const db = await connection();

  const chatRoom = await db.collection('messages').findOne({ user: email });

  if (!chatRoom) return [];

  const messageList = chatRoom.messages;

  return messageList;
};

const addMessage = async (email, message) => {
  const db = await connection();

  const chatRoom = await db.collection('messages').findOne({ user: email });

  if (chatRoom) {
    const updatedChatList = [...chatRoom.messages, message];

    return db.collection('messages')
      .updateOne({ user: email }, { $set: { messages: updatedChatList } });
  }

  return db.collection('messages').insertOne({ user: email, messages: [message] });
};

const listAllRooms = async () => {
  const db = await connection();

  const list = await db.collection('messages').find({}).toArray();

  return list;
};

module.exports = {
  listRoomMessages,
  addMessage,
  listAllRooms,
};
