import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MenuBar from '../MenuBar';
import { getProductsLocalStorage } from '../../utils/localStorage';
import { getOrdersFromAPI } from '../../services/api_endpoints';
import './styles.css';
import Footer from '../Footer';

const Orders = () => {
  const quantityOfDigits = 2;
  const dateDigit = 10;
  const [orders, setOrders] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async (token) => {
      const sales = await getOrdersFromAPI(token);
      setOrders(sales);
      return sales;
    };
    const { token } = getProductsLocalStorage('user');
    if (!token) setRedirect(true);
    fetchData(token);
  }, []);

  const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    if (day < dateDigit) return `0${day}/${month}`;
    return `${day}/${month}`;
  };

  const formatTotal = (total) => `R$ ${parseFloat(total).toFixed(quantityOfDigits).replace('.', ',')}`;

  if (redirect) return <Redirect to="/login" />;
  return (
    <>
      <MenuBar titleName="Cliente - Meus Pedidos" />
      <section className="orders-list">
        {orders.sort().map(({ id: orderId, sale_date: date, total_price: total }, index) => (
          <Link
            data-testid={ `${index}-order-card-container` }
            key={ orderId }
            className="order-card"
            to={ `orders/${orderId}` }
          >
            <div className="order-info">
              <span className="info-label">Pedido:</span>
              <span data-testid={ `${index}-order-number` }>
                { `Pedido ${orderId}` }
              </span>
            </div>
            <div className="order-info">
              <span>Data:</span>
              <span data-testid={ `${index}-order-date` }>
                { formatDate(date) }
              </span>
            </div>
            <div className="order-info">
              <span>Total pago</span>
              <span data-testid={ `${index}-order-total-value` }>
                { formatTotal(total) }
              </span>
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </>
  );
};

export default Orders;
