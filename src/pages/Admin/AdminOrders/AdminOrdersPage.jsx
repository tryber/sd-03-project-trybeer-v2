import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AdminNavBar from '../../../components/Admin/AdminBar/AdminNavBar';
import AdminOrderCard from '../../../components/Admin/OrderCard/AdminOrderCard';
import { ordersList } from '../../../services';
import "./adminOrdersPage.css"

export default function OrdersPage() {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setIsLoading(true);
    ordersList().then((data) => setSales(data));
    setIsLoading(false);
  }, []);

  if (!userData) return <Redirect to="/login" />;

  return isLoading ? (
    <h1>Carregando...</h1>
  ) : (
    <div style={{  }}>
      <AdminNavBar title="TryBeer" />
        <h1>Pedidos pendentes</h1>
      <div className="admin-orders-page-container">
        {sales
          ? sales.map((ele, index) => (
              <AdminOrderCard
                id={ele.id}
                address={ele.deliveryAddress + ', ' + ele.deliveryNumber}
                totalPrice={ele.totalPrice}
                status={ele.status}
                key={index}
              />
            ))
          : ''}
      </div>
    </div>
  );
}
