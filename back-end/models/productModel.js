const { connection } = require('./connection');

const getAllProducts = async () => connection()
  .then((schema) => schema
    .getTable('products')
    .select()
    .execute())
  .then((products) => products.fetchAll())
  .catch((err) => err);

module.exports = {
  getAllProducts,
};
