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

  const { id } = useParams();
  const url = `http://localhost:3001/sales/search/${id}`;
  const getDetails = async () => {
    try {
      const result = await fetch(url);
      const json = await result.json();
      console.log(json.sale);
      return setSale(json.sale);
    } catch (error) {
      return error.message;
    }
  };

  const alterStatus = async (id, status) => {
    status = 'Entregue';
    await orderFinished(id, status);
    return getDetails();
  };

  useEffect(() => {
    getDetails();
    setIsLoading(false);
  }, [setPending]);

  useEffect(() => {
    if (sale.status === 'Entregue') setPending(false);
  });

  if (!userData) return <Redirect to="/login" />;

  return isLoading || !sale ? (
    <h1>Carregando...</h1>
  ) : (
    <div>
      <AdminNavBar title="TryBeer" />
      <div className="admin-details-order-info">
        <h1 data-testid="order-number">
          Pedido {sale.saleID ? sale.saleID : ''}
          <span data-testid="order-status"> - {sale.status ? sale.status : ''}</span>
        </h1>
        <div>
          {sale.products ? (
            sale.products.map((ele, i) => (
              <div key={i}>
                <li className="admin-order-details-li">
                  <div className="admin-details-card">
                    <span className="details-span-sq" data-testid={`${i}-product-qtd`}>
                      {ele.soldQuantity}
                    </span>
                    <span className="details-span-pn" data-testid={`${i}-product-name`}>
                      {ele.productName}
                    </span>
                    <span className="details-span-tp" data-testid={`${i}-product-total-value`}>
                      R$ {(ele.productPrice * ele.soldQuantity).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="details-span-up" data-testid={`${i}-order-unit-price`}>
                      (R$ {ele.productPrice.toFixed(2).replace('.', ',')})
                    </span>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
          <p className="details-total-price" data-testid="order-total-value">
            Total: R$ {sale.orderValue ? sale.orderValue.toFixed(2).replace('.', ',') : ''}
          </p>
        </div>
        {pending ? (
          <button className="status-btn" onClick={() => alterStatus(id, sale.status)} data-testid="mark-as-delivered-btn">
            Marcar como entregue
          </button>
        ) : (
          <Link to="/admin/orders">
            <button className="status-btn">Voltar</button>
          </Link>
        )}
      </div>
    </div>
  );
}
