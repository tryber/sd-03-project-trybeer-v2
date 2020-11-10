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

  const alterStatus = async (orderId) => {
    const resp = await updateOrderStatus(orderId, token);
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
                Pedido
                {' '}
                {order.saleID ? order.saleID : ''}
                <span data-testid="order-status">
                  {' '}
                  -
                  {' '}
                  {order.status ? order.status : ''}
                </span>
              </h1>
            </div>
            <ul className="list-group list-group-flush">
              {order.products
                && order.products.map(
                  (
                    {
                      soldProductID, soldQuantity, productName, productPrice,
                    },
                    index,
                  ) => (
                    <li className="list-group-item" key={ soldProductID }>
                      <div>
                        <div>
                          <span>Quantidade: </span>
                          {' '}
                          <span data-testid={ `${index}-product-qtd` }>
                            {soldQuantity}
                          </span>
                        </div>
                        <h3 data-testid={ `${index}-product-name` }>
                          {productName}
                        </h3>
                        <h3 data-testid={ `${index}-order-unit-price` }>
                          (R$
                          {' '}
                          {productPrice.toFixed(2).replace('.', ',')}
                          )
                        </h3>
                        <h6 data-testid={ `${index}-product-total-value` }>
                          R$
                          {' '}
                          {(productPrice * soldQuantity)
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
                  order.orderValue ? formatPrice(order.orderValue) : '0,00'
                }`}
              </h3>
            </div>
            {order.status === 'Pendente' ? (
              <button
                type="button"
                onClick={ () => alterStatus(id) }
                data-testid="mark-as-delivered-btn"
                className="btn btn-lg delivery-button"
              >
                Marcar como entregue
              </button>
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
