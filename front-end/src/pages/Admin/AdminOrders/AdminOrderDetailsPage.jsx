/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
// eslint-disable no-shadow react/jsx-indent

import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import AdminNavBar from '../../../components/Admin/AdminBar/AdminNavBar';
import { orderFinished } from '../../../services';
import './adminOrderDetailsPage.css';

export default function OrderDetailsPage() {
  const [sale, setSale] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pending, setPending] = useState(true);
  const userData = JSON.parse(localStorage.getItem('user'));

  const fixed = 2;

  const { id } = useParams();
  const url = `http://localhost:3001/sales/search/${id}`;
  const getDetails = async () => {
    try {
      const result = await fetch(url);
      const json = await result.json();
      return setSale(json.sale);
    } catch (error) {
      return error.message;
    }
  };

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
    getDetails();
    setIsLoading(false);
  }, [setPending, getDetails]);

  useEffect(() => {
    if (sale.status === 'Entregue') setPending(false);
  }, [sale.status]);

  if (!userData) return <Redirect to="/login" />;

  return isLoading || !sale ? (
    <h1>Carregando...</h1>
  ) : (
    <div>
      <AdminNavBar title="TryBeer" />
      <div className="admin-details-order-info">
        <h1 data-testid="order-number">
          Pedido
          {' '}
          {sale.saleID ? sale.saleID : ''}
          <span data-testid="order-status">
            {' '}
            -
            {' '}
            {sale.status ? sale.status : ''}
          </span>
        </h1>
        <div>
          {sale.products ? (
            sale.products.map((ele, i) => (
              <div key={ ele }>
                <li className="admin-order-details-li">
                  <div className="admin-details-card">
                    <span className="details-span-sq" data-testid={ `${i}-product-qtd` }>
                      {ele.soldQuantity}
                    </span>
                    <span className="details-span-pn" data-testid={ `${i}-product-name` }>
                      {ele.productName}
                    </span>
                    <span className="details-span-tp" data-testid={ `${i}-product-total-value` }>
                      R$
                      {' '}
                      {(ele.productPrice * ele.soldQuantity).toFixed(fixed).replace('.', ',')}
                    </span>
                    <span className="details-span-up" data-testid={ `${i}-order-unit-price` }>
                      (R$
                      {' '}
                      {ele.productPrice.toFixed(fixed).replace('.', ',')}
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
            {sale.orderValue ? sale.orderValue.toFixed(fixed).replace('.', ',') : ''}
          </p>
        </div>
        {pending ? (
          <div>
            <button type="button" className="status-btn" onClick={ () => alterPrepared(id, sale.status) } data-testid="mark-as-prepared-btn">
              Preparar pedido
            </button>
            <button type="button" className="status-btn" onClick={ () => alterDelivered(id, sale.status) } data-testid="mark-as-delivered-btn">
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
