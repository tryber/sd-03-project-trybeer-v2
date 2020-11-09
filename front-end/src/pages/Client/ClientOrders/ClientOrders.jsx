import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import ClientOrderCard from '../../../components/Client/ClientOrder/ClientOrderCard';
import { userOrders } from '../../../services';

function ClientOrders() {
  const initialUserId = 0;
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const [userId, setUserId] = useState(initialUserId);
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setUserId(userData.id);
    if (!userId) return undefined;
    setIsFetching(true);
    userOrders(userId).then(
      (response) => {
        setOrders(response);
        setIsFetching(false);
      },
      (response) => {
        setErrors(response);
        setIsFetching(false);
      },
    );
    return () => {
      setOrders(null);
      setErrors(null);
      setIsFetching(false);
    };
  }, [userId, userData.id]);

  if (!userData.name) return <Redirect to="/login" />;

  return (
    <div style={ { display: 'flex', flexDirection: 'column', width: "360px" } }>
      <ClientNavBar title="Meus Pedidos" />
      <div style={{overflowY: "scroll", height: "560px"}}>
      {errors && <h4>{errors}</h4>}
      {!isFetching && orders && orders.map((order, index) => (
        <ClientOrderCard
          key={ order.id }
          index={ index }
          id={ order.id }
          saleDate={ order.saleDate }
          totalPrice={ order.totalPrice }
        />
      ))}
      </div>
    </div>
  );
}

export default ClientOrders;
