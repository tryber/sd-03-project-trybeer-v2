const { connection } = require('./connection');

const getAllProducts = async () => {
  try {
    const dBase = await connection();
    const query = await dBase
      .getTable('products')
      .select(['id', 'name', 'price', 'url_image'])
      .execute();
    const results = await query.fetchAll();
    return results
      ? results.map(([id, name, price, urlImage]) => ({
        id,
        name,
        price,
        urlImage,
      }))
      : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getAllProducts };
