const { connection } = require('./connection');

const getUserByEmail = async (userEmail) => (
  connection()
    .then((schema) => schema
      .getTable('users')
      .select(['id', 'name', 'email', 'password', 'role'])
      .where('email = :email')
      .bind('email', userEmail)
      .execute())
    .then((results) => results.fetchOne())
    .then(([id, name, email, password, role]) => ({
      id, name, email, password, role,
    }))
    .catch((err) => err)
);

const getUserById = async (userId) => (
  connection()
    .then((schema) => schema
      .getTable('users')
      .select(['id', 'name', 'email', 'password', 'role'])
      .where('email = :email')
      .bind('id', userId)
      .execute())
    .then((results) => results.fetchOne())
    .then(([id, name, email, password, role]) => ({
      id, name, email, password, role,
    }))
    .catch((err) => err)
);

const createUser = async (name, email, password, seller) => {
  try {
    const role = seller ? 'administrator' : 'client';
    await connection()
      .then((db) => db
        .getTable('users')
        .insert(['name', 'email', 'password', 'role'])
        .values(name, email, password, role)
        .execute());
    return { name, email, password, role };
  } catch (err) {
    return err;
  }
};

const updateName = async (userName, userEmail) => (
  connection()
    .then((schema) => schema
      .getTable('users')
      .update()
      .set('name', userName)
      .where('email = :email')
      .bind('email', userEmail)
      .execute())
);

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateName,
};
