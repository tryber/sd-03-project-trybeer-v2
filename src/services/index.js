const userLogin = async (email, password) => {
  const request = fetch('https://ilan274-back.herokuapp.com/login', {
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
  const request = fetch('https://ilan274-back.herokuapp.com/register', {
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
  const request = fetch('https://ilan274-back.herokuapp.com/profile', {
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
  const request = fetch('https://ilan274-back.herokuapp.com/checkout', {
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
  const request = fetch('https://ilan274-back.herokuapp.com/productList', {
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
  const request = fetch('https://ilan274-back.herokuapp.com/admin/orders', {
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
  const request = fetch(`https://ilan274-back.herokuapp.com/sales/search/${encodeURIComponent(orderId)}`, {
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
  const request = fetch(`https://ilan274-back.herokuapp.com/admin/orders/${encodeURIComponent(orderId)}`, {
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
  const messages = await fetch('https://ilan274-back.herokuapp.com/chat/history', {
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
  const chatlist = await fetch('https://ilan274-back.herokuapp.com/chat');
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
