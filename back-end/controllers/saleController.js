// const jwt = require('jsonwebtoken');
// const {
//   insertSale,
//   getAllSales,
//   getSaleInfo,
//   getSalesByUser,
//   endSale,
// } = require('../services/saleService');

// const createSale = async (req, res) => {
//   const data = req.body;
//   const { nameAdress, numberAdress } = data;
//   const { cart, user, justNumberPrice } = req.body;
//   const { id } = user;

//   const sale = await insertSale(id, nameAdress, numberAdress, justNumberPrice, cart);

//   return res.status(200).json(sale);
// };

// const getSales = async (req, res) => {
//   const { authorization } = req.headers;
//   const JWT_SECRET = 'tentecerveja';
//   const { id } = jwt.verify(authorization, JWT_SECRET);
//   const sales = await getSalesByUser(id);
//   return res.status(200).json(sales);
// };

// const listSales = async (_req, res) => {
//   const sales = await getAllSales();
//   return res.status(200).json(sales);
// };

// const saleDetails = async (req, res) => {
//   const sales = await getSaleInfo(req.params.id);
//   const { code } = sales;
//   return res.status(code).json(sales);
// };

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

// module.exports = {
//   createSale,
//   getSales,
//   listSales,
//   saleDetails,
//   setAsDelivered,
// };
