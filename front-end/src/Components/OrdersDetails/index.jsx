import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
// import { getOrdersFromAPI } from '../../services/api_endpoints';
import MenuBar from '../MenuBar';

const mock = {
  id: 1,
  date: '08/09',
  products: [
    {
      qty: 1,
      name: 'Agua coca latao mary pffff',
      price: 3,
    },
    {
      qty: 2,
      name: 'Agua coca pffff',
      price: 3,
    },
    {
      qty: 5,
      name: 'Agua coca latao mary',
      price: 3,
    },
  ],
  total: 9,
};

const OrdersDetails = () => {
  const [order, setOrders] = useState(mock);
  // const { id } = useParams();
  const { token } = JSON.parse(localStorage.getItem('user')) || '';

  useEffect(() => {
    setOrders(mock);
    // const getData = async (id) => {
    //   setOrders(await getOrdersFromAPI(id))
    // }
    // getData(id);
  }, []);

  if (!token) return <Redirect to="/login"/>

  return (
    <div>
      <MenuBar titleName="Cliente - Detalhes de Pedido" />
      {order &&
        <div>
          <h3 data-testid="order-number" >{`Pedido ${order.id}`}</h3>
          <h3 data-testid="order-date" >{`Data: ${order.date}`}</h3>
          {order.products.map((product, i) => (
            <div key={product.name}>
              <h4 data-testid={`${i}-product-qtd`} >{product.qty}</h4>
              <h4 data-testid={`${i}-product-name`} >{product.name}</h4>
              <h4 data-testid={`${i}-product-total-value`} >{product.price}</h4>
            </div>
          ))}
          <h3 data-testid="order-total-value" >{`Total: R$${order.total}`}</h3>
        </div>}
    </div>
  );
};

export default OrdersDetails;
