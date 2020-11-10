const connection = require('./connection');
const connectionPlain = require('./connectionPlain');

const registerSale = async (userId, price, address, number, date, satus = 'Pendente') => {
  const db = await connection();

  return db
    .getTable('sales')
    .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .values(userId, price, address, number, date, satus)
    .execute()
    .then((result) => result.getAutoIncrementValue());
};

const registerSaleProduct = async (saleId, productId, qty) => {
  const db = await connection();

  return db
    .getTable('sales_products')
    .insert(['sale_id', 'product_id', 'quantity'])
    .values(saleId, productId, qty)
    .execute();
};

const fetchOrders = async () => {
  const db = await connection();
  const fetch = await db.getTable('sales')
    .select(['id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .orderBy('id')
    .execute();
  const recipes = fetch.fetchAll();

  return recipes.map(([id, totalPrice, deliveryAddress, deliveryNumber, saleDate, status]) => (
    { id, totalPrice, deliveryAddress, deliveryNumber, saleDate, status }
  ));
};

const getOrderDetail = async (SaleId) => connectionPlain()
  .then((session) => session
    .sql(`
      SELECT sp.sale_id, sp.product_id, sp.quantity, pr.name, pr.price
      FROM Trybeer.sales_products AS sp
      INNER JOIN Trybeer.products AS pr
      ON sp.product_id = pr.id
      WHERE sp.sale_id = ?;
    `)
    .bind(SaleId)
    .execute())
  .then((results) => results.fetchAll())
  .then((products) => products.map(([saleId, productId, quantity, name, price]) => ({
    saleId, productId, quantity, name, price,
  })))
  .catch((err) => { console.error(err); });
// supported by Gustavo Figueiredo, and ckecked this is the only way of using "join" at https://stackoverflow.com/questions/55571181/how-to-use-join-query-in-sql-using-x-devapi-and-nodejs.

const getOrderById = async (Id) => connection()
  .then((db) => db
    .getTable('sales')
    .select(['id', 'user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .where('id = :id')
    .bind('id', Id)
    .execute())
  .then((results) => results.fetchAll()[0] || [])
  .then(([id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status]) => (id
    ? ({ id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status }) : null))
  .catch((err) => { console.error(err); });

const updateOrder = async (saleId) => (
  connection()
    .then((db) => db
      .getTable('sales')
      .update()
      .set('status', 'Entregue')
      .where('id = :saleId')
      .bind('saleId', saleId)
      .execute())
);

module.exports = {
  registerSale,
  registerSaleProduct,
  fetchOrders,
  getOrderDetail,
  getOrderById,
  updateOrder,
};
