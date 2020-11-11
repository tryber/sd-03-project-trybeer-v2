import React, { useEffect, useState } from 'react';
import AdminMenuSideBar from '../../components/adminMenuSideBar/AdminMenuSideBar';
import { getAllAdminOrders } from '../../services/ordersService';
import { getUserFromLocalStorage } from '../../utils/localStorageFunctions';
import formatPrice from '../../utils/formatPrice';
import './AdminOrders.css';

function AdminOrders() {
  const [orders, setOrders] = useState(null);
  const user = getUserFromLocalStorage();

  const token = user ? user.token : '';

  const onCardClick = (orderNumber) => {
    window.location.href = `/admin/orders/${orderNumber}`;
  };

  useEffect(() => {
    getAllAdminOrders(token).then((result) => setOrders(result));
  }, []);

  if (!orders || orders.length === 0)
    return (
      <div className="d-flex">
        <AdminMenuSideBar />
        <div className="container text-center">
          <h1 id="message">Nenhum pedido ainda...</h1>
        </div>
      </div>
    );

  return (
    <div className="d-flex">
      <AdminMenuSideBar />
      <div className="orders-list container">
        {orders &&
          orders.map(
            (
              {
                id,
                total_price: totalPrice,
                delivery_address: deliveryAddress,
                delivery_number: deliveryNumber,
                status,
              },
              index
            ) => (
              <div
                className="card order-card"
                data-testid={`${index}-order-card-container`}
                key={id}
              >
                <div className="card-body" onClick={() => onCardClick(id)}>
                  <h5
                    className="card-title"
                    data-testid={`${index}-order-number`}
                  >
                    {`Pedido ${id}`}
                  </h5>

                  <h6
                    className="card-text"
                    data-testid={`${index}-order-address`}
                  >
                    {`Rua ${deliveryAddress}, ${deliveryNumber}`}
                  </h6>

                  <h5
                    className="card-text"
                    data-testid={`${index}-order-total-value`}
                  >
                    {`R$ ${formatPrice(totalPrice)}`}
                  </h5>

                  <h6
                    className="card-text"
                    data-testid={`${index}-order-status`}
                  >
                    {status}
                  </h6>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default AdminOrders;
