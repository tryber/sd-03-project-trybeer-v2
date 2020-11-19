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
    .then((resp) => resp.data);
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
    .then((resp) => resp.data);

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
    .then((resp) => resp.data);

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
    .then((resp) => resp.data);
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
    .then((res) => res.data);

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
    .then((result) => result.data);
  return convos;
};

export const getChatMessages = async (email) => {
  const msgs = await axios({
    baseURL: `${url}admin/chat/${email}`,
    method: 'get',
  })
    .then((result) => result.data);
    return msgs[0];
};

export const createChatFile = async (email) => {
  const convo = await axios({
    baseURL: `${url}admin/chat/${email}`,
    method: 'post',
  })
    .then((result) => result.data);
    return convo;
};

export const updateChatMessages = async (email, chatHistory) => {
  await axios({
    baseURL: `${url}admin/chat/${email}`,
    method: 'put',
    data: {
      messages: chatHistory,
    }
  })
    .then((result) => result.data);
};

export const getOrderList = async (token) => {
  const orders = await axios({
    baseURL: `${url}admin/orders`,
    method: 'get',
    headers: {
      authorization: token,
    },
  })
    .then((result) => result.data);
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
    .then((resp) => resp.data);
  return response;
};

export const markOrderStatus = async (token, id, status) => {
  await axios({
    baseURL: `${url}admin/orders/${id}`,
    method: 'post',
    headers: {
      authorization: token,
    },
    data: {
      status,
    },
  });
};

export const postNewOrd = async (nameAdress, numberAdress, cart, user, justNumberPrice, token) => {
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
    .then((resp) => resp.data);

  return response;
};
