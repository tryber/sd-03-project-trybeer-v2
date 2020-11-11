const {
  getAllSales,
  insertSale,
  getSalesByUser,
  getSaleInfo,
  // // endSale,
} = require('../services/saleService');

const listSales = async (_req, res) => {
  const sales = await getAllSales();
  return res.status(sales.status).json(sales.response);
};

const getSalesByUserId = async (req, res) => {
  const { id } = req.user;
  const sales = await getSalesByUser(id);
  if (sales.message) return res.status(sales.status).json({ message: sales.message });
  return res.status(sales.status).json(sales.response);
};

const createSale = async (req, res) => {
  const { id } = req.user;
  const { cart, justNumberPrice, nameAdress, numberAdress } = req.body;
  const sale = await insertSale(id, nameAdress, numberAdress, justNumberPrice, cart);
  console.log(sale);
  return res.status(sale.status).json({ message: sale.response });
};

const saleDetails = async (req, res) => {
  const sales = await getSaleInfo(req.params.id);
  const { status, response } = sales;
  return res.status(status).json(response);
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
  getSalesByUserId,
  saleDetails,
  // setAsDelivered,
};
