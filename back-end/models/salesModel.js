const connection = require('./connection');
const getSession = require('./getSession');

const postSale = async ({ totalPrice, deliveryAddress, deliveryNumber, status }, userId, date) => {
  const db = await connection();
  const result = await db
    .getTable('sales')
    .insert([
      'user_id',
      'total_price',
      'delivery_address',
      'delivery_number',
      'sale_date',
      'status',
    ])
    .values(userId, totalPrice, deliveryAddress, deliveryNumber, date, status || 'Pendente')
    .execute();
  return {
    id: result.getAutoIncrementValue(),
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    date,
    status: status || 'Pendente',
  };
};

const postSaleProduct = async ({ productId, quantity }, saleId) => {
  const db = await connection();
  const result = await db
    .getTable('sales_products')
    .insert(['sale_id', 'product_id', 'quantity'])
    .values(saleId, productId, quantity)
    .execute();
  return { id: result.getAutoIncrementValue(), saleId, productId, quantity };
};

const getAllSales = async () => {
  const db = await connection();
  const table = await db.getTable('sales');
  const result = await table.select().execute();
  const sales = result.fetchAll();
  return sales.map(([id, userId, totalPrice, deliveryAddress, deliveryNumber, date, status]) => ({
    id,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    date,
    status,
  }));
};

const getSaleById = async (saleId) => {
  const db = await connection();
  const table = await db.getTable('sales');
  const result = await table
    .select()
    .where('id = :id')
    .bind('id', saleId)
    .execute();
  const sale = await result.fetchOne() || [];
  if (sale.length === 0) return sale;
  const [id, userId, totalPrice, deliveryAddress, deliveryNumber, date, status] = sale;
  return {
    id,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    date,
    status,
  };
};

const getSaleProducts = async (saleId) => {
  const session = await getSession();
  const result = await session
    .sql(
      `SELECT prod.id, prod.name, prod.price, prod.url_image, sp.quantity
      FROM Trybeer.products AS prod
      RIGHT JOIN Trybeer.sales_products AS sp
      ON prod.id = sp.product_id
      WHERE sp.sale_id = ?;`,
    )
    .bind(saleId)
    .execute();
  const products = await result.fetchAll();
  return products.map(([id, name, price, urlImage, quantity]) => ({
    id,
    name,
    price,
    urlImage,
    quantity,
  }));
};

const markAsDelivered = async (id) => connection().then((db) => db.getTable('sales')
  .update()
  .set('status', 'Entregue')
  .where('id = :id')
  .bind('id', id)
  .execute());

module.exports = {
  postSale,
  postSaleProduct,
  getAllSales,
  getSaleById,
  getSaleProducts,
  markAsDelivered,
};
