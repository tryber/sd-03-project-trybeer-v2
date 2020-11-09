const userLogin = async (email, password) => {
  const request = fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.token)
        : Promise.reject(data.message))));
  return request;
};

const registerUser = async (name, email, password, role) => {
  const request = fetch('http://localhost:3001/user/register', {
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
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.token)
        : Promise.reject(data.message))));
  return request;
};

const updateUser = async (name, email) => {
  const request = fetch('http://localhost:3001/user/profile', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.token)
        : Promise.reject(data.message))));
  return request;
};

const registerOrder = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  products = [],
) => {
  const request = fetch('http://localhost:3001/sales/register', {
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
      products,
    }),
  }).then((response) => response
    .json()
    .then((data) => (response.ok
      ? Promise.resolve(data.saleID)
      : Promise.reject(data.message))));
  return request;
};

const userOrders = async (userId) => {
  const request = fetch(`http://localhost:3001/sales/search?userId=${encodeURIComponent(userId)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.sales)
        : Promise.reject(data.message))));
  return request;
};

const ordersList = async () => {
  const request = fetch('http://localhost:3001/sales/search/all', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.sales)
        : Promise.reject(data.message))));
  return request;
};

const orderDetails = async (orderId) => {
  const request = fetch(`http://localhost:3001/sales/search/${encodeURIComponent(orderId)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.sales)
        : Promise.reject(data.message))));
  return request;
};

const orderFinished = async (orderId, status) => {
  const request = fetch(`http://localhost:3001/sales/search/${encodeURIComponent(orderId)}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  })
    .then((response) => response
      .json()
      .then((data) => (response.ok
        ? Promise.resolve(data.sales)
        : Promise.reject(data.message))));
  return request;
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
};
