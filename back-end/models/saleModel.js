const { queryConnection, connection } = require('./connection');

const createSale = async (id,
  totalPrice, nameAdress, numberAdress, saleDate, status) => connection()
  .then((schema) => schema
    .getTable('sales')
    .insert(['user_id', 'total_price', 'delivery_address', 'delivery_number', 'sale_date', 'status'])
    .values(id, totalPrice, nameAdress, numberAdress, saleDate, status)
    .execute())
  .then((query) => query.getAutoIncrementValue())
  .catch((err) => err);

const registerSaleProduct = async (saleId, productId, quantity) => connection()
  .then((schema) => schema
    .getTable('sales_products')
    .insert(['sale_id', 'product_id', 'quantity'])
    .values(saleId, productId, quantity)
    .execute())
  .catch((err) => err);

const getSalesById = async (uId) => connection()
  .then((schema) => schema
    .getTable('sales')
    .select()
    .where('user_id = :uId')
    .bind('uId', uId)
    .execute())
  .then((sales) => sales
    .fetchAll()
    .map(([id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status]) => ({
      id, userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
    })))
  .catch((err) => err);

const getSales = async () => connection()
  .then((db) => db
    .getTable('sales')
    .select()
    .execute())
  .then((orders) => orders.fetchAll())
  .catch((error) => error);

const getSaleById = async (id) => connection()
  .then((db) => db
    .getTable('sales')
    .select()
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((sale) => sale.fetchOne())
  .then(([saleId, userId, total, address, number, date, status]) => ({
    saleId,
    userId,
    total,
    address,
    number,
    date,
    status,
  }));

const getSaleItems = async (id) => {
  const query = `SELECT s.sale_id, s.quantity, p.name, p.price
  FROM Trybeer.sales_products as s
  JOIN Trybeer.products AS p WHERE s.product_id = p.id
  AND s.sale_id = ${id}`;

  return queryConnection(query)
    .then((items) => items.fetchAll())
    .then((fetched) => fetched.map((elem) => (
      {
        saleId: elem[0],
        quantity: elem[1],
        productName: elem[2],
        unitPrice: elem[3],
      }
    )));
};

const finishSale = async (id) => connection()
  .then((db) => db
    .getTable('sales')
    .update()
    .set('status', 'Entregue')
    .where('id = :id')
    .bind('id', id)
    .execute());

module.exports = {
  createSale,
  registerSaleProduct,
  getSalesById,
  getSales,
  getSaleById,
  getSaleItems,
  finishSale,
};
