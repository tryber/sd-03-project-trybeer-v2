const connection = require('./connection');

const login = async (Email) => (
  connection()
    .then((db) => db
      .getTable('users')
      .select(['id', 'name', 'email', 'password', 'role'])
      .where('email LIKE :email')
      .bind('email', Email)
      .execute())
    .then((fetch) => fetch.fetchOne())
    .then((result) => {
      if (!result) return null;
      const [id, name, email, password, role] = result;
      return { id, name, email, password, role };
    })
);

const updateName = async (email, name) => (
  connection()
    .then((db) => db
      .getTable('users')
      .update()
      .set('name', name)
      .where('email = :email')
      .bind('email', email)
      .execute())
);

const register = async (name, email, password, role) => (
  connection()
    .then((db) => db
      .getTable('users')
      .insert(['name', 'email', 'password', 'role'])
      .values(name, email, password, role)
      .execute())
);

module.exports = {
  login,
  updateName,
  register,
};
