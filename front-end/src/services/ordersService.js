export const getAllClientOrders = async (id, token) => {
  const response = await fetch(`http://localhost:3001/orders?id=${id}`, {
    headers: { authorization: token },
  });
  const orders = await response.json();
  return orders;
};

export const getAllAdminOrders = async (token) => {
  const response = await fetch('http://localhost:3001/admin/orders', {
    headers: { authorization: token },
  });
  const orders = await response.json();
  return orders;
};

export const getOneOrder = async (id, token) => fetch(`http://localhost:3001/search/${id}`, {
  headers: { authorization: token },
})
  .then((response) => response.json())
  .then((order) => order);

export const updateOrderStatus = async (id, status, token) => {
  const response = await fetch(`http://localhost:3001/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', authorization: token },
    body: JSON.stringify({ status }),
  });
  const order = await response.json();
  return order;
};
