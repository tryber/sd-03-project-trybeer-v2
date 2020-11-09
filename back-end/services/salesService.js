const { salesModel } = require('../models');

const registerSales = async (userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber, products = []) => {
  try {
    // registra evento de venda
    const registrySales = await salesModel.addSale(userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber);

    // registro dos produtos por evento de venda
    const registryProductsBySale = await Promise
      .all(products.map((product) => {
        const { id, quantity } = product;
        return salesModel.addSalesProducts(registrySales.saleID, id, quantity);
      }));
    const itemCount = await registryProductsBySale.reduce((acc, item) => acc + item, 0);
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
    const sales = await salesModel.getSalesDetailsByID(saleID);
    const salesData = sales.length ? { saleID: sales[0].saleID,
      userID: sales[0].userID,
      orderValue: sales[0].orderValue,
      deliveryAddress: sales[0].deliveryAddress,
      deliveryNumber: sales[0].deliveryNumber,
      saleDate: sales[0].saleDate,
      status: sales[0].status,
      products: sales.map(({ soldProductID,
        soldQuantity,
        productName,
        productPrice,
        productImage }) => ({
        soldProductID,
        soldQuantity,
        productName,
        productPrice,
        productImage,
      })) } : {};

    return { ...salesData };
  } catch (error) {
    throw new Error(error.message);
  }
};

const salesByUser = async (userId) => {
  try {
    const sales = await salesModel.getSalesByUser(userId);

    return [...sales];
  } catch (error) {
    throw new Error(error.message);
  }
};

const allSales = async () => {
  try {
    const sales = await salesModel.getAllSales();

    return [...sales];
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
