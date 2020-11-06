import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderData, markOrderAsDelivered } from '../../services/api_endpoints';
import AdminSideBar from '../AdminSideBar/index';
import realFormat from '../../utils/realFormat';
import './styles.css';

const AdminOrdersDetail = () => {
  const [saleInfo, setSaleInfo] = useState({ total: 0 });
  const [saleItems, setSaleItems] = useState([]);
  const [saleStatus, setSaleStatus] = useState();
  const { saleId, total } = saleInfo;
  const { id } = useParams();

  const markAsDelivered = async () => {
    setSaleStatus('Entregue');
    await markOrderAsDelivered(saleId);
  };

  useEffect(() => {
    const fetchSale = async () => await getOrderData(id) || [];
    fetchSale().then((data) => {
      setSaleInfo(data.saleInfo);
      setSaleItems(data.saleItems);
      setSaleStatus(data.saleInfo.status);
    });
  }, [id]);

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
            {saleItems.map(({ productName, quantity, unitPrice }, index) => (
              <li key={ productName }>
                <span data-testid={ `${index}-product-qtd` }>
                  {`${quantity} - `}
                </span>
                <span data-testid={ `${index}-product-name` }>
                  {`${productName} - `}
                </span>
                <span data-testid={ `${index}-product-total-value` }>
                  {`R$ ${realFormat(unitPrice * quantity)}`}
                </span>
                <span
                  className="product-unit-price"
                  data-testid={ `${index}-order-unit-price` }
                >
                  {`(R$ ${realFormat(unitPrice)}`}
                  )
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
        <button
          type="button"
          className={ `sale-${saleStatus}-btn` }
          data-testid="mark-as-delivered-btn"
          onClick={ () => markAsDelivered() }
        >
          Marcar como entregue
        </button>
      </div>
    </div>
  );
};

export default AdminOrdersDetail;
