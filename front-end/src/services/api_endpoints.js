const axios = require('axios');

const url = 'http://localhost:3001/';

export const getUserFromAPI = async (email, password) => {
  const response = await axios({
    baseURL: `${url}login`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .then((resp) => resp.data)
    .catch((e) => console.log('Login error', e));
  return response;
};

export const postNewUserAPI = async (name, email, password, seller) => {
  const response = await axios({
    baseURL: `${url}register`,
    method: 'post',
    data: {
      name,
      email,
      password,
      seller,
    },
  })
    .then((resp) => resp.data)
    .catch((e) => console.log('Register error', e));

  return response;
};

export const postUpdateName = async (name, email, token) => {
  const response = await axios({
    baseURL: `${url}profile`,
    method: 'post',
    headers: {
      authorization: token,
    },
    data: {
      name,
      email,
    },
  })
    .then((resp) => resp.data)
    .catch((e) => console.log('Update User error', e));

  return response;
};

export const getProductsFromAPI = async (token) => {
  const response = await axios({
    baseURL: `${url}products`,
    method: 'get',
    headers: {
      authorization: token,
    },
  })
    .then((resp) => resp.data)
    .catch((e) => console.log('List Products error', e));
  return response;
};

export const getOrdersFromAPI = async (token) => {
  const response = await axios({
    baseURL: `${url}orders`,
    method: 'get',
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.data)
    .catch((e) => console.log('Orders List error', e));

  return response;
};

export const getChatsList = async (token) => {
  const convos = await axios({
    baseURL: `${url}admin/chats`,
    method: 'get',
    headers: {
      authorization: token,
    },
  })
    .then((result) => result.data)
    .catch((e) => console.log('Error fetching message logs', e));
  return convos;
};

export const getOrderList = async (token) => {
  const orders = await axios({
    baseURL: `${url}admin/orders`,
    method: 'get',
    headers: {
      authorization: token,
    },
  })
    .then((result) => result.data)
    .catch((e) => console.log('Order error', e));
  return orders;
};

export const getOrderData = async (id, token) => {
  const response = await axios({
    baseURL: `${url}admin/orders/${id}`,
    headers: {
      authorization: token,
    },
    method: 'get',
  })
    .then((resp) => resp.data)
    .catch((e) => console.log('Order data Error', e));
  return response;
};

export const markOrderAsDelivered = async (id) => {
  await axios({
    baseURL: `${url}admin/orders/${id}`,
    method: 'post',
  });
};

export const postNewOrder = async (nameAdress, numberAdress, cart, user, justNumberPrice, token) => {
  const response = await axios({
    baseURL: `${url}checkout`,
    method: 'post',
    headers: {
      authorization: token,
    },
    data: {
      nameAdress,
      numberAdress,
      cart,
      user,
      justNumberPrice,
    },
  })
    .then((resp) => resp.data)
    .catch((e) => console.log('Create Order error', e));

  return response;
};
