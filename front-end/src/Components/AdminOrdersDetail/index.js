import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsLocalStorage } from '../../utils/localStorage';
import { getOrderData, markOrderStatus } from '../../services/api_endpoints';
import AdminSideBar from '../AdminSideBar/index';
import realFormat from '../../utils/realFormat';
import './styles.css';

const AdminOrdersDetail = () => {
  const { token } = getProductsLocalStorage('user');
  const [saleInfo, setSaleInfo] = useState({});
  const [saleItems, setSaleItems] = useState([]);
  const [saleStatus, setSaleStatus] = useState('Status');
  const [disableButton, setDisableButton] = useState('');
  const { id: saleId = 0, total_price: total = 0} = saleInfo;
  const { id } = useParams();
  const orderStatus = [
    { name: 'Preparar pedido', status: 'Preparando', testId: 'mark-as-prepared-btn' },
    { name: 'Marcar como entregue', status: 'Entregue', testId: 'mark-as-delivered-btn' },
  ];

  const markStatus = async (status) => {
    setSaleStatus(status);
    setDisableButton(status);
    await markOrderStatus(token, saleId, status);
  };

  useEffect(() => {
    const fetchSale = async () => await getOrderData(id, token) || [];
    fetchSale().then(({ saleInfo: saleData }) => {
      setSaleInfo(saleData);
      setSaleItems(saleData.products);
      setSaleStatus(saleData.status);
      setDisableButton(saleData.status);
      return null;
    });
  }, [id, token]);

  return (
    <div className="admin-order-items">
      <AdminSideBar />
      <div>
        <h1>
          <span
            data-testid="order-number"
            className="sale-number"
          >
            {`Pedido ${saleId}`}
          </span>
          <span
            data-testid="order-status"
            className={ `sale-${saleStatus}` }
          >
            {saleStatus}
          </span>
        </h1>
        <div className="sale-items">
          <ul>
            {saleItems.map(({ name, sales_products: { quantity }, price }, index) => (
              <li key={ name }>
                <span data-testid={ `${index}-product-qtd` }>
                  {`${quantity} - `}
                </span>
                <span data-testid={ `${index}-product-name` }>
                  {`${name} - `}
                </span>
                <span data-testid={ `${index}-product-total-value` }>
                  {`R$ ${realFormat(price * quantity)}`}
                </span>
                <span
                  className="product-unit-price"
                  data-testid={ `${index}-order-unit-price` }
                >
                  {`(R$ ${realFormat(price)})`}
                </span>
              </li>
            ))}
          </ul>
          <h2
            data-testid="order-total-value"
            className="sale-total"
          >
            {`Total: R$ ${realFormat(total)}`}
          </h2>
        </div>
        {orderStatus.map(({ name, status, testId }) => (
          <button
            data-testid={ testId }
            type="button"
            key={ name + status }
            className={ disableButton }
            onClick={ () => markStatus(status) }
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersDetail;
