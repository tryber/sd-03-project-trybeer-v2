const { sales } = require('../models');

const adminOrderDetailService = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  // const status = 'Entregue';
  const result = await sales.update({ status }, { where: { id } });
  if (result.length) {
    res.status(202).send(result);
  } else {
    res.status(500).send({ message: 'Internal Server Error', code: 'server_error' });
  }
};

module.exports = adminOrderDetailService;
