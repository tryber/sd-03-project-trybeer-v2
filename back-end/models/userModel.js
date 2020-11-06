const { connection } = require('./connection');

const getByEmail = async (mail) => {
  try {
    const db = await connection();
    const searchDb = await db
      .getTable('users')
      .select()
      .where('email = :email')
      .bind('email', mail)
      .execute();
    const result = await searchDb.fetchAll()[0];
    if (result) {
      const [id, name, email, password, role] = result;
      return id && password ? { id, email, password, name, role } : null;
    }
    return null;
  } catch (err) {
    return process.exit(1);
  }
};

const registerUser = async ({ name, email, password, role }) => connection().then((db) => db
  .getTable('users')
  .insert(['name', 'email', 'password', 'role'])
  .values(name, email, password, role)
  .execute());

const updateUser = async (name, email) => connection().then((db) => db
  .getTable('users')
  .update()
  .set('name', name)
  .where('email = :email')
  .bind('email', email)
  .execute());

module.exports = {
  getByEmail,
  registerUser,
  updateUser,
};
