const chatModel = require('../modelMongo/chatModel');

const addUserMessages = async (messages, email) => {
  const user = await chatModel.findUserByEmail(email);

  if (!user) {
    await chatModel.createUserHistory(messages, email);
    return;
  }

  await chatModel.updateUserHistory(messages, email);

  return true;
};

const findAll = async () => chatModel.findAll();

module.exports = {
  findAll,
  addUserMessages,
};
