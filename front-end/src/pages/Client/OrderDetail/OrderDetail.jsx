/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import OrderDetailsCard from '../../../components/Client/ClientOrderDetails/OrderDetailsCard';

function OrderDetail() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { saleDate = {} } = details;
  const sqlFormattedDate = (date = '') => {
    const initialDateIndex = 5;
    const finalDateIndex = 10;
    const extractDayAndMonth = date.slice(initialDateIndex, finalDateIndex).split('-').reverse()
      .join('/');
    return extractDayAndMonth;
  };

  const { id } = useParams();
  const { token } = userData;
  const getDetails = async () => {
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
    console.log(request);
    return request;
  };

  // const url = `http://localhost:3001/orderDetails/${id}`;
  // const getDetails = async () => {
  //   try {
  //     const result = await fetch(url);
  //     const json = await result.json();
  //     return setDetails(json.sale);
  //   } catch (error) {
  //     return error.message;
  //   }
  // };

  const requestDetails = async () => getDetails(setDetails);

  useEffect(() => {
    if (details.saleID) return undefined;
    setLoading(false);
    requestDetails();
    return () => {};
  }, [requestDetails, details.saleID]);

  if (!userData.name) return <Redirect to="/login" />;

  return (
    <div>
      <ClientNavBar title="Detalhes de Pedido" />
      {loading && <h1>Loading...</h1>}
      {!loading && details.saleID && <OrderDetailsCard
        object={ details }
        date={ sqlFormattedDate(saleDate) }
      />}
    </div>
  );
}

export default OrderDetail;
