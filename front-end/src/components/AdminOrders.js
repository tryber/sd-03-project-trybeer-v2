import React, { useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';
import './AdminOrders.css';

const two = 2;

const getOrdersList = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get('http://localhost:3001/admin/orders', { headers: { authorization: token } });
  const orders = response.data;
  return orders;
};

const redirectToDetails = (id, setId, history) => {
  setId(id);
  history.push(`/admin/orders/${id}`);
};

const AdminOrders = () => {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const { orders, setOrders, setId } = useContext(ContextAplication);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOrdersList() || [];
        setOrders(data);
      } catch (e) {
        return e;
      }
      return false;
    }
    fetchData();
  }, [setOrders]);

  return (
    <div>
      { user === null && <Redirect to="/login" />}
      <AdminMenu />
      <div className="orders-list">
        {orders.map((o, index) => (
          <button type="button" className="order-card" onClick={ () => redirectToDetails(o.saleId, setId, history) } key={ o.saleId }>
            <p data-testid={ `${index}-order-number` }>
              Pedido
              {' '}
              {o.saleId}
            </p>
            <p data-testid={ `${index}-order-address` }>
              {' '}
              {`${o.address}, ${o.number}`}
            </p>
            <p data-testid={ `${index}-order-total-value` }>
              R$
              {` ${o.total.toFixed(two).toString().replace('.', ',')}`}
            </p>
            <p data-testid={ `${index}-order-status` }>
              {' '}
              {o.status}
            </p>
          </button>))}
      </div>
    </div>
  );
};

export default AdminOrders;
