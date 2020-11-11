const connection = require('./connection');

const getAll = async () => connection()
  .then((db) =>
    db
      .collection('chats')
      .find({})
      .project({ 'clientEmail': 1, 'messages': 1 })
      .toArray()
  );

module.exports = {
  getAll,
};
