const connection = require('./connection');

const fetchAllProducts = async () => {
  const db = await connection();

  const fetch = await db.getTable('products').select(['id', 'name', 'price', 'url_image'])
    .execute();

  const recipes = fetch.fetchAll();

  return recipes.map(([id, name, price, urlImage]) => ({ id, name, price, urlImage }));
};

const getProductById = async (Id) => connection()
  .then((db) => db
    .getTable('products')
    .select(['id', 'name', 'price'])
    .where('id = :id')
    .bind('id', Id)
    .execute())
  .then((results) => results.fetchAll()[0] || [])
  .then(([id, name, price]) => (id ? ({ id, name, price }) : null))
  .catch((err) => { console.error(err); });

module.exports = {
  fetchAllProducts,
  getProductById,
};
