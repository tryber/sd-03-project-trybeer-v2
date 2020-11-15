const { userLogin, registerUser } = require('./usersController');
const { updateClientName } = require('./clientsController');
const { getAllProducts } = require('./productsController');
const { registerSale, getOneOrder, getAllOrders, getAllClientOrders, updateOrderStatus } = require('./salesController');
const messageController = require('./messageController');

module.exports = {
  userLogin,
  registerUser,
  updateClientName,
  getAllProducts,
  registerSale,
  getOneOrder,
  getAllOrders,
  getAllClientOrders,
  updateOrderStatus,
  messageController,
};
