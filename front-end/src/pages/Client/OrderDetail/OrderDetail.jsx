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
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { token } = userData;

  const requestDetails = useCallback(
    async () => setDetails(await getDetails(id, token)), [getDetails],
  );

  useEffect(() => {
    setLoading(false);
    requestDetails();
  }, [requestDetails, details.saleID]);

  return (
    <div>
      <ClientNavBar title="Detalhes de Pedido" />
      {/* {console.log('details', details.map((e) => e.status.sale_date))} */}
      {details === undefined ? <h1>Loading...</h1>
        : <OrderDetailsCard
            object={ details }
        />}
    </div>
  );
}

export default OrderDetail;
