/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import OrderDetailsCard from '../../../components/Client/ClientOrderDetails/OrderDetailsCard';

const getDetails = async (id, token) => {
  const request = await fetch(`http://localhost:3001/orderDetails/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
    },
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data.message))));
  return request.details;
};

function OrderDetail() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const [details, setDetails] = useState([]);

  const { id } = useParams();
  const { token } = userData;

  const requestDetails = useCallback(
    async () => setDetails(await getDetails(id, token)), [id, token],
  );

  useEffect(() => {
    requestDetails();
  }, [requestDetails, details.saleID]);

  const date = details.map((e) => e.saleInfo[0].sale_date);
  console.log(details);

  return (
    <div>
      <ClientNavBar title="Detalhes de Pedido" />
      {details === undefined ? <h1>Loading...</h1>
        : <OrderDetailsCard
            details={ details }
            saleDate={ date }
        />}
    </div>
  );
}

export default OrderDetail;
