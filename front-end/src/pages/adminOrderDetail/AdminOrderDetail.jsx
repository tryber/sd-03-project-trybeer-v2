import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminMenuSideBar from '../../components/adminMenuSideBar/AdminMenuSideBar';
import { getOneOrder, updateOrderStatus } from '../../services/ordersService';
import formatPrice from '../../utils/formatPrice';
import { getUserFromLocalStorage } from '../../utils/localStorageFunctions';
import './AdminOrderDetail.css';

function AdminOrderDetail({ match }) {
  const [order, setOrder] = useState(null);
  const user = getUserFromLocalStorage();

  const token = user ? user.token : '';
  const { id } = match.params;

  const alterStatus = async (orderId, status) => {
    const resp = await updateOrderStatus(orderId, status, token);
    setOrder(resp);
  };

  const fetchOrder = async (orderId, userToken) => {
    getOneOrder(orderId, userToken).then((selectOrder) => setOrder(selectOrder.sale));
  };

  useEffect(() => {
    fetchOrder(id, token);
  }, []);

  if (!user) return <Redirect to="/login" />;
  return (
    <div className="d-flex">
      <AdminMenuSideBar />
      <div className="admin-order-details-page container">
        {order && order.products ? (
          <div className="card checkout-card">
            <div className="card-header">
              <h1 data-testid="order-number">
                {`Pedido ${order.id}`}
                <span data-testid="order-status">
                  {` - ${order.status}`}
                </span>
              </h1>
            </div>
            <ul className="list-group list-group-flush">
              {order.products
                && order.products.map(
                  (
                    {
                      id: productId, sales_products : { quantity }, name, price,
                    },
                    index,
                  ) => (
                    <li className="list-group-item" key={ productId }>
                      <div>
                        <div>
                          <span>Quantidade: </span>
                          {' '}
                          <span data-testid={ `${index}-product-qtd` }>
                            {quantity}
                          </span>
                        </div>
                        <h3 data-testid={ `${index}-product-name` }>
                          {name}
                        </h3>
                        <h3 data-testid={ `${index}-order-unit-price` }>
                          (R$
                          {' '}
                          {price.toFixed(2).replace('.', ',')}
                          )
                        </h3>
                        <h6 data-testid={ `${index}-product-total-value` }>
                          R$
                          {' '}
                          {(price * quantity)
                            .toFixed(2)
                            .replace('.', ',')}
                        </h6>
                      </div>
                    </li>
                  ),
                )}
            </ul>
            <div className="card-footer">
              <h3 className="card-text" data-testid="order-total-value">
                {`Total: R$ ${
                  order.total_price ? formatPrice(order.total_price) : '0,00'
                }`}
              </h3>
            </div>
            {order.status !== 'Entregue' ? (
              <div id="buttons-div">
                <button
                type="button"
                onClick={ () => alterStatus(order.id, 'Preparando') }
                data-testid="mark-as-prepared-btn"
                className="btn btn-lg delivery-button"
              >
                Preparar pedido
              </button>
              <button
                type="button"
                onClick={ () => alterStatus(order.id, 'Entregue') }
                data-testid="mark-as-delivered-btn"
                className="btn btn-lg delivery-button"
              >
                Marcar como entregue
              </button>
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <h1 className="text-center message-detail">
            {order ? 'O pedido não foi encontrado' : 'Loading...'}
          </h1>
        )}
      </div>
    </div>
  );
}

export default AdminOrderDetail;

AdminOrderDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
