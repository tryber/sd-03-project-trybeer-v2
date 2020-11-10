import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuTop from '../../components/menuTop/MenuTop';
import { getOneOrder } from '../../services/ordersService';
import formatDate from '../../utils/formatDate';
import formatPrice from '../../utils/formatPrice';
import { getUserFromLocalStorage } from '../../utils/localStorageFunctions';
import Sidebar from '../../components/sidebar/Sidebar';
import './ClientOrderDetail.css';

function ClientOrderDetail({ match }) {
  const [order, setOrder] = useState(null);
  const user = getUserFromLocalStorage();

  const token = user ? user.token : '';
  const { id } = match.params;

  const fetchOrder = async (orderId, UserToken) => {
    getOneOrder(orderId, UserToken).then((selectOrder) => setOrder(selectOrder.sale));
  };

  useEffect(() => {
    fetchOrder(id, token);
  }, []);

  if (!user) return <Redirect to="/login" />;

  return (
    <div>
      <MenuTop pageTitle="Detalhes de Pedido" />
      <Sidebar />
      <div id="wrapper" className="order-details-page container">
        {order ? (
          <div className="card">
            {console.log(order)}
            {console.log(order[0]["products.name"])}
            <div className="card-header">
              <h3
                className="card-text"
                data-testid="order-number"
              >{`Pedido ${order && order[0].id}`}</h3>
              <p className="card-text" data-testid="order-date">
                {formatDate(order && order[0].sale_date)}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              {order && order.map(
                (
                  el,
                  index
                ) => (
                  <li className="list-group-item" key={el["products.id"]}>
                    <div>
                      <h4 data-testid={`${index}-product-name`}>
                        {el['products.name']}
                      </h4>
                      <p
                        data-testid={`${index}-product-qtd`}
                      >{`Quantidade: ${0}`}</p>
                      <p data-testid={`${index}-product-total-value`}>
                        {`Total do produto: R$ ${formatPrice(
                          el['products.price'] * 1
                        )}`}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ul>
            <div className="card-footer">
              <h3 className="card-text" data-testid="order-total-value">
                {`Total: R$ ${order ? formatPrice(order[0].total_price): '0,00'}`}
              </h3>
            </div>
          </div>
        ) : (
          <h1 className="text-center message-geral">{order ? 'O pedido não foi encontrado' : 'Loading...'}</h1>
        )}
      </div>
    </div>
  );
}

export default ClientOrderDetail;

ClientOrderDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
