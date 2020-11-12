const { sales, sequelize } = require('../models');

const registerSales = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  products = [],
) => {
  try {
    // registra evento de venda
    const registrySales = await salesModel.addSale(
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    );

    // registro dos produtos por evento de venda
    const registryProductsBySale = await Promise.all(
      products.map((product) => {
        const { id, quantity } = product;
        return salesModel.addSalesProducts(registrySales.saleID, id, quantity);
      }),
    );
    const itemCount = await registryProductsBySale.reduce(
      (acc, item) => acc + item,
      0,
    );
    return { ...registrySales, soldItems: itemCount };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSalesStatus = async (id, status) => {
  try {
    const updateStatus = await salesModel.updateSaleStatus(id, status);

    if (!updateStatus) throw new Error();
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const salesDetailsById = async (saleID) => {
  try {
    const salesDetails = await sequelize.query(
      `SELECT sales.*, sproducts.product_id AS sold_product_id, sproducts.quantity AS sold_quantity, products.name AS product_name, products.price AS product_price, products.url_image AS product_image FROM Trybeer.sales_products AS sproducts INNER JOIN Trybeer.sales AS sales ON sproducts.sale_id = sales.id AND sales.id = ${saleID} INNER JOIN Trybeer.products AS products ON sproducts.product_id = products.id ORDER BY sales.id`,
    );
    const salesResults = salesDetails.reduce(
      (
        acc,
        [
          id,
          userID,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleDate,
          status,
          soldProductID,
          soldQuantity,
          productName,
          productPrice,
          productImage,
        ],
      ) => [
        ...acc,
        {
          saleID: id,
          userID,
          orderValue: totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleDate: new Date(saleDate).toISOString(),
          status,
          soldProductID,
          soldQuantity,
          productName,
          productPrice,
          productImage,
        },
      ],
      [],
    );
    const salesData = salesResults.length
      ? {
        saleID: salesResults[0].saleID,
        userID: salesResults[0].userID,
        orderValue: salesResults[0].orderValue,
        deliveryAddress: salesResults[0].deliveryAddress,
        deliveryNumber: salesResults[0].deliveryNumber,
        saleDate: salesResults[0].saleDate,
        status: salesResults[0].status,
        products: salesResults.map(
          ({
            soldProductID,
            soldQuantity,
            productName,
            productPrice,
            productImage,
          }) => ({
            soldProductID,
            soldQuantity,
            productName,
            productPrice,
            productImage,
          }),
        ),
      }
      : {};

    return { ...salesData };
  } catch (error) {
    throw new Error(error.message);
  }
};

const salesByUser = async (userId) => {
  try {
    const allSales = await sales.findAll({ where: { user_id: userId } });
    return [...allSales];
  } catch (error) {
    throw new Error(error.message);
  }
};

const allSales = async () => {
  try {
    const AllSales = await sales.findAll({});
    return [...AllSales];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  allSales,
  salesDetailsById,
  salesByUser,
  registerSales,
  updateSalesStatus,
};
