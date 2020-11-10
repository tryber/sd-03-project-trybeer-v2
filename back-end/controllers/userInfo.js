const { Router } = require('express');
const service = require('../services');

const userInfo = Router();

userInfo.post('/', async (req, res) => {
  const { email } = req.body;
  const {
    code,
    message,
    userId,
    street,
    city,
    district,
    number,
  } = await service.login.collectInfo(email);
  if (message) return res.status(code).json({ message });
  // console.log({ street, city, district, number });
  return res.status(200).json({ userId, street, city, district, number });
});

module.exports = userInfo;
