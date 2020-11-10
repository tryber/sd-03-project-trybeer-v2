const {
  getAllSales,
  insertSale,
  // getSalesByUserId,
  getSaleInfo,
  // // endSale,
} = require('../services/saleService');

const listSales = async (_req, res) => {
  const sales = await getAllSales();
  return res.status(sales.status).json(sales.response);
};

// const getSalesById = async (req, res) => {
//   const { id } = req.params;
//   const sales = await getSalesByUserId(id);
//   return res.status(sales.status).json(sales.response);
// };

const createSale = async (req, res) => {
  const { id } = req.user;
  const { cart, justNumberPrice, nameAdress, numberAdress } = req.body;
  const sale = await insertSale(id, nameAdress, numberAdress, justNumberPrice, cart);

  return res.status(sale.status).json(sale.response);
};

const saleDetails = async (req, res) => {
  const sales = await getSaleInfo(req.params.id);
  const { status } = sales;
  return res.status(status).json(sales);
};

// const setAsDelivered = async (req, res) => {
//   const { id } = req.params;
//   const { saleInfo } = await getSaleInfo(id) || [];

//   switch (true) {
//     case !saleInfo:
//       return res.status(404).json({ message: 'Order not found' });
//     case saleInfo.status === 'Entregue':
//       return res.status(304).json({ message: 'Order was already delivered' });
//     case saleInfo.status === 'Pendente':
//       return endSale(id).then(() => res.status(200));
//     default:
//       return res.status(400).json({ message: 'Sorry. Try again!' });
//   }
// };

module.exports = {
  listSales,
  createSale,
  // getSalesById,
  saleDetails,
  // setAsDelivered,
};
