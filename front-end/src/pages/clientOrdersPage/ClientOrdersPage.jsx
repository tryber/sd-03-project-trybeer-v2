import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MenuTop from '../../components/menuTop/MenuTop';
import { getAllClientOrders } from '../../services/ordersService';
import { getUserFromLocalStorage } from '../../utils/localStorageFunctions';
import ListOrdersCards from '../../components/listOrdersCards/ListOrdersCards';
import Sidebar from '../../components/sidebar/Sidebar';
import './ClientOrdersPage.css';

function ClientOrdersPage() {
  const [orders, setOrders] = useState(null);
  const user = getUserFromLocalStorage();
  const lengthValidation = 0;

  const token = user ? user.token : '';
  const id = user ? user.id : '';

  const fetchAllOrders = async () =>
    getAllClientOrders(id, token).then((result) => setOrders(result));

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (!user) return <Redirect to="/login" />;

  return (
    <div>
      <MenuTop pageTitle="Meus Pedidos" />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          {orders && orders.length > lengthValidation ? (
            <ListOrdersCards orders={orders} />
          ) : (
            <h1 className="text-center message-order">
              {orders && orders.length === 0
                ? 'Nenhum pedido registrado'
                : 'Loading...'}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientOrdersPage;
