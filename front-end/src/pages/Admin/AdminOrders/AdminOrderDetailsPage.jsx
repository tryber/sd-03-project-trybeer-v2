/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
// eslint-disable no-shadow react/jsx-indent

import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import AdminNavBar from '../../../components/Admin/AdminBar/AdminNavBar';
import { orderFinished } from '../../../services';
import './adminOrderDetailsPage.css';

const fixed = 2;

const getDetails = async (id, token) => {
  const request = await fetch(`http://localhost:3001/admin/orders/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
    },
  }).then((response) => response
    .json()
    .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data.message))));
  return request;
};

export default function OrderDetailsPage() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const [sale, setSale] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pending, setPending] = useState(true);
  const { id } = useParams();
  const { token } = userData;

  const requestDetails = useCallback(
    async () => setSale(await getDetails(id, token)), [id, token],
  );

  const alterDelivered = async (idParam, status) => {
    status = 'Entregue';
    await orderFinished(idParam, status);
    return getDetails();
  };

  const alterPrepared = async (idParam, status) => {
    status = 'Preparando';
    await orderFinished(idParam, status);
    return getDetails();
  };

  useEffect(() => {
    setIsLoading(false);
    requestDetails();
  }, [setPending, requestDetails]);

  useEffect(() => {
    if (sale.orderStatus === 'Entregue') setPending(false);
  });

  if (!userData) return <Redirect to="/login" />;

  return isLoading || !sale ? (
    <h1>Carregando...</h1>
  ) : (
    <div>
      <AdminNavBar title="TryBeer" />
      <div style={ { marginTop: '80px' } } className="admin-details-order-info">
        <h1 data-testid="order-number">
          Pedido
          {' '}
          {sale.saleID ? sale.saleID : ''}
          <span data-testid="order-status">
            {' '}
            -
            {' '}
            {sale.orderStatus ? sale.orderStatus : ''}
          </span>
        </h1>
        <div>
          {sale.orderProducts ? (
            sale.orderProducts.map((ele, i) => (
              <div key={ ele }>
                <li className="admin-order-details-li">
                  <div className="admin-details-card">
                    <span className="details-span-sq" data-testid={ `${i}-product-qtd` }>
                      {ele.quantity}
                    </span>
                    <span className="details-span-pn" data-testid={ `${i}-product-name` }>
                      {ele.name}
                    </span>
                    <span className="details-span-tp" data-testid={ `${i}-product-total-value` }>
                      R$
                      {' '}
                      {(ele.price * ele.quantity).toFixed(fixed).replace('.', ',')}
                    </span>
                    <span className="details-span-up" data-testid={ `${i}-order-unit-price` }>
                      (R$
                      {' '}
                      {ele.price.toFixed(fixed).replace('.', ',')}
                      )
                    </span>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
          <p className="details-total-price" data-testid="order-total-value">
            Total: R$
            {' '}
            {sale.total_price ? parseFloat(sale.total_price).toFixed(fixed).replace('.', ',') : ''}
          </p>
        </div>
        {pending ? (
          <div>
            <button type="button" className="status-btn" onClick={ () => alterPrepared(id, sale.orderStatus) } data-testid="mark-as-prepared-btn">
              Preparar pedido
            </button>
            <button type="button" className="status-btn" onClick={ () => alterDelivered(id, sale.orderStatus) } data-testid="mark-as-delivered-btn">
              Marcar como entregue
            </button>
          </div>
        ) : (
          <Link to="/admin/orders">
            <button type="button" className="status-btn">Voltar</button>
          </Link>
        )}
      </div>
    </div>
  );
}
