require('dotenv').config();
//const path = require('path');
//const route = express.static(path.join(__dirname, '../../../back-end'))
const userLogin = async (email, password) => {
  const request = fetch('/3001/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data.token) : Promise.reject(data.message))));
  return request;
};

const registerUser = async (name, email, password, role) => {
  const request = fetch('/3001/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role,
    }),
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data.token) : Promise.reject(data.message))));
  return request;
};

const updateUser = async (name, email) => {
  const request = fetch('http://localhost:3001/profile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data.token) : Promise.reject(data.message))));
  return request;
};

const registerOrder = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  store = [],
  sale_date = new Date(),
  status = 'Pendente',
) => {
  const request = fetch('http://localhost:3001/checkout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      store,
      sale_date,
      status,
    }),
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data.saleID) : Promise.reject(data.message))));
  return request;
};

const userOrders = async (token) => {
  const request = fetch('/3001/productList', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
    },
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data.message))));
  return request;
};

const ordersList = async () => {
  const request = fetch('http://localhost:3001/admin/orders', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data.message))));
  return request;
};

const orderDetails = async (orderId) => {
  const request = fetch(`http://localhost:3001/sales/search/${encodeURIComponent(orderId)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data.sales) : Promise.reject(data.message))));
  return request;
};

const orderFinished = async (orderId, status) => {
  const request = fetch(`http://localhost:3001/admin/orders/${encodeURIComponent(orderId)}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data.sales) : Promise.reject(data.message))));
  return request;
};

const getMessageHistory = async (userEmail) => {
  const messages = await fetch('http://localhost:3001/chat/history', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail }),
  });
  const res = await messages.json();
  return res;
};

const getAdminChatList = async () => {
  const chatlist = await fetch('http://localhost:3001/chat');
  const res = await chatlist.json();
  return res;
};

export {
  userLogin,
  registerUser,
  updateUser,
  registerOrder,
  userOrders,
  ordersList,
  orderDetails,
  orderFinished,
  getMessageHistory,
  getAdminChatList,
};
