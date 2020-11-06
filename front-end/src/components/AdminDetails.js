import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AdminMenu from './Menu/AdminMenu';
import { ContextAplication } from '../context/ContextAplication';
import currency from '../helpers/currency';

const getOrder = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get(`http://localhost:3001/admin/orders/${id}`, { headers: { authorization: token } });
  const answer = { ...response.data, total: currency(response.data.total) };
  return answer;
};

const changeStatus = async (id, order, setOrder) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  await axios.put(`http://localhost:3001/admin/orders/${id}`, { status: 'Entregue' }, { headers: { authorization: token } });

  const newOrder = { ...order, status: 'Entregue' };
  setOrder(newOrder);
};

const AdminDetails = () => {
  const { order, setOrder, id } = useContext(ContextAplication);
  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOrder(id) || [];
        setOrder(data);
      } catch (e) {
        return e;
      }
      return false;
    }
    fetchData();
  }, [id, setOrder]);

  return (
    <div>
      { user === null && <Redirect to="/login" />}
      <AdminMenu />
      <h1 data-testid="order-number">
        Pedido
        {' '}
        { order.saleId }
        {' '}
        -
      </h1>
      <h1 data-testid="order-status">
        {' '}
        { order.status }
      </h1>
      { order.saleProducts.map((p, index) => (
        <div key={ p.soldProductId }>
          <p data-testid={ `${index}-product-qtd` }>{ p.soldQuantity }</p>
          <p data-testid={ `${index}-product-name` }>{ p.productName }</p>
          <p data-testid={ `${index}-product-total-value` }>{ currency(p.productPrice * p.soldQuantity) }</p>
          <p data-testid={ `${index}-order-unit-price` }>{ `(${currency(p.productPrice)})` }</p>
        </div>)) }
      <h3 data-testid="order-total-value">
        Total:
        {' '}
        { order.total }
      </h3>
      { order.status === 'Pendente' && <button onClick={ () => changeStatus(id, order, setOrder) } type="button" data-testid="mark-as-delivered-btn">Marcar como entregue</button>}
    </div>
  );
};

export default AdminDetails;
