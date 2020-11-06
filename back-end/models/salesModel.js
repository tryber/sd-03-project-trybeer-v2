const { connection, sqlConnection } = require('./connection');

const getAllSales = async () => {
  const sales = await connection()
    .then((db) => db
      .getTable('sales')
      .select(['id', 'total_price', 'delivery_address', 'delivery_number', 'status'])
      .execute())
    .then((results) => results.fetchAll())
    .then((results) => results.map(([id, totalPrice, deliveryAddress, deliveryNumber, status]) => ({
      saleId: id,
      total: totalPrice,
      address: deliveryAddress,
      number: deliveryNumber,
      status,
    })));
  if (!sales) return null;
  return sales;
};

const updateSaleById = async (saleId, status) => {
  try {
    console.log('M', status);
    connection()
      .then((db) => db
        .getTable('sales')
        .update()
        .set('status', status)
        .where('id = :id')
        .bind('id', saleId)
        .execute());
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSaleInfo = async (saleId) => connection()
  .then((db) => db
    .getTable('sales')
    .select(['id', 'user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .where('id = :id')
    .bind('id', saleId)
    .execute())
  .then((results) => results.fetchAll()[0])
  .then(([id, userID, totalPrice, deliveryAddress, deliveryNumber, saleDate, status]) => (id ? {
    saleId: id,
    userId: userID,
    total: totalPrice,
    address: deliveryAddress,
    number: deliveryNumber,
    saleDate /* : new Date(saleDate).toISOString() */,
    status,
  } : null));

const getSale = async (saleId) => {
  try {
    // query de join feita pelo Hebert Freitas (https://github.com/Hfreitas)
    const joinQuery = `SELECT sales.id, sproducts.product_id AS sold_product_id, sproducts.quantity AS sold_quantity, products.name AS product_name, products.price AS product_price, products.url_image AS product_image FROM Trybeer.sales_products AS sproducts INNER JOIN Trybeer.sales AS sales ON sproducts.sale_id = sales.id AND sales.id = ${saleId} INNER JOIN Trybeer.products AS products ON sproducts.product_id = products.id ORDER BY sales.id`;

    const searchQuery = await sqlConnection(joinQuery);

    const results = await searchQuery.fetchAll();
    console.log('R', results);
    const salesResults = results.reduce(
      (acc, [
        id,
        soldProductID,
        soldQuantity,
        productName,
        productPrice,
        productImage,
      ]) => ([...acc, {
        saleId: id,
        soldProductId: soldProductID,
        soldQuantity,
        productName,
        productPrice,
        productImage,
      }]), [],
    );

    return salesResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSaleByUserId = async (userID) => connection()
  .then((db) => db
    .getTable('sales')
    .select()
    .where('user_id = :userId')
    .bind('userId', userID)
    .execute())
  .then((results) => results.fetchAll())
  .then((results) => console.log(results) || results.map(
    ([
      id,
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
    ]) => ({
      id,
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
    }),
  ));

const checkout = async (
  id,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate,
  status,
) => connection().then((db) => db
  .getTable('sales')
  .insert([
    'user_id',
    'total_price',
    'delivery_address',
    'delivery_number',
    'sale_date',
    'status',
  ])
  .values(
    id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  )
  .execute())
  .then((result) => result.getAutoIncrementValue());

const insertSaleProduct = async (id, cart) => {
  const db = await connection();
  await Promise.all(cart.map(async (product) => {
    await db.getTable('sales_products')
      .insert(['sale_id', 'product_id', 'quantity'])
      .values([id, product.id, product.quantity])
      .execute()
      .then((result) => console.log(result));
  }));
};

module.exports = {
  getSaleByUserId,
  checkout,
  getAllSales,
  updateSaleById,
  getSale,
  getSaleInfo,
  insertSaleProduct,
};
