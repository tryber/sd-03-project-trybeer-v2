const { connection } = require('./connection');

const listAllProducts = async () => {
  const products = await connection()
    .then((db) => db
      .getTable('products')
      .select(['id', 'name', 'price', 'url_image'])
      .execute())
    .then((results) => results.fetchAll())
    .then((results) => results.map(([id, name, price, urlImage]) => ({
      id,
      name,
      price,
      image: urlImage,
    })));
  if (!products) return null;
  return products;
};

module.exports = { listAllProducts };
