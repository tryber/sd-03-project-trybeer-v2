const rescue = require('express-rescue');
const { clientsService } = require('../services');

const updateClientName = rescue(async (req, res) => {
  const { name, email } = req.body;

  const user = await clientsService.updateClientName(name, email);

  if (user.err) {
    return res.status(400).json(user);
  }

  return res.status(200).json(user);
});

module.exports = {
  updateClientName,
};
