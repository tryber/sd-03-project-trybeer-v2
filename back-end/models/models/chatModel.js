const connection = require('./connectionMdb');

const listRoomMessages = async (email) => {
  const db = await connection();

  const chatRoom = await db.collection('chatRooms').findOne({ where: { user: email } });

  if (!chatRoom) return [];

  const messageList = chatRoom.messages;

  return messageList;
};

const addMessage = async (email, message) => {
  const db = await connection();

  const chatRoom = await db.collection('chatRooms').findOne({ where: { user: email } });

  if (chatRoom) {
    const updatedChatList = chatRoom.messages.push(message);

    return db.collection('chatRooms')
      .updateOne({ where: { user: email } }, { $set: { messages: updatedChatList } });
  }

  return db.collection('chatRooms').insertOne({ user: email, messages: [message] });
};

const listAllRooms = async () => {
  const db = await connection();

  const list = await db.collection('chatRooms').find({}).toArray();

  return list;
};

module.exports = {
  listRoomMessages,
  addMessage,
  listAllRooms,
};
