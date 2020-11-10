const moment = require('moment');
const { sale, sales_products: saleProducts } = require('../models');

const getAllSales = async () => {
  const sales = await sale.findAll({}, { include: 'user' });
  if (sales.length === 0) return { status: 404, message: 'Nenhuma venda encontrada.' };
  return { status: 200, response: sales };
  // return sales.map(
  //   ([id, userId, totalPrice, deliveryAddress, deliveryNumber, date, status]) => (
  //     { id, userId, totalPrice, deliveryAddress, deliveryNumber, date, status }
  //   ),
  // );
};

const getSalesByUser = async (uId) => {
  const sales = await sale.findAll({ where: { userId: uId } });
  if (sales.length === 0) return { status: 404, message: 'Nenhuma venda encontrada para este usuário.' };
  return { status: 200, response: sales };
};

const insertSale = async (id, addressName, addressNumber, totalPrice, cart) => {
  const date = moment().format('YYYY/MM/DD h:mm:ss');
  const status = 'Pendente';

  // Registrando venda na tabela sales e retornando o Id da Venda.
  const { dataValues } = await sale.create({
    user_id: id,
    total_price: totalPrice,
    delivery_address: addressName,
    delivery_number: addressNumber,
    sale_date: date,
    status,
  });

  // Para cada Produto do Carrinho, cria-se um registro do produto na tabela sales_products
  // passando Id da Venda + Id Produto + Quantidade
  cart.forEach(async ({ id: prodId, quantity }) => {
    await saleProducts.create({ sale_id: dataValues.id, product_id: prodId, quantity });
  });

  return { status: 201, response: 'Compra realizada com sucesso!' };
};

// const getSaleInfo = async (id) => {
//   const saleInfo = await getSaleById(id);
//   const saleItems = await getSaleItems(id);
//   return saleItems.length
//     ? { code: 200, saleItems, saleInfo }
//     : { code: 404, message: 'Sale not found' };
// };

// const endSale = async (id) => finishSale(id);

module.exports = {
  getAllSales,
  getSalesByUser,
  insertSale,
  // getSaleInfo,
  // endSale,
};
