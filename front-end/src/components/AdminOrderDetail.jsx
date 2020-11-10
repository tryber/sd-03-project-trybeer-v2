import React from 'react';
import AdminChangeStatusOrderAPI from '../services/AdminOrderChangeStatusService';
import './CSS/AdminOrderDetail.css';

const adminOrderDetail = ({Children, OrderNumber, StatusChanged}) => {
  let disableBtn = false;
  const changeOrderStatus = async () => {
    const response = await AdminChangeStatusOrderAPI(OrderNumber);
    if (response) {
      if (response.status === 202)
        StatusChanged(true);
        console.log('Pedido atualizado!');
    }
  };

  if (!Children.orderProducts.length) {
    return (<div>Order Not Found!</div>);
  }

  return (
    <div>
      { Children &&
      <div>
        <div>
          <span data-testid="order-number">Pedido {OrderNumber}</span> - <span data-testid="order-status">{Children.orderStatus[0].status}</span>
        </div>
        {Children.orderProducts.map((e, i) =>
          <div className="list-container" key={e.name}>
            <div data-testid={`${i}-product-qtd`}>{e.quantity}</div>
            <div>{` - `}</div>
            <div data-testid={`${i}-product-name`}>{e.name}</div>
            <div data-testid={`${i}-product-total-value`}>{`R$ ${(e.quantity*e.price).toFixed(2).replace('.',',')}`}</div>
            <div data-testid={`${i}-order-unit-price`}>{`(R$ ${(e.price).toFixed(2).replace('.',',')})`}</div>
          </div>
        )}
        <div data-testid="order-total-value">
          {
          `Total R$ ${(Children.orderProducts.reduce((acc, e) =>
              acc += e.price * e.quantity,
            0)).toFixed(2).replace('.',',')}`
          }
        </div>{ (Children.orderStatus === 'Entregue') ? disableBtn = true : disableBtn = false }
        <div>
          { !disableBtn &&
            <button
              data-testid="mark-as-delivered-btn" onClick={() => changeOrderStatus()}
            >Marcar como entregue</button>
          }
        </div>
      </div>
      }
    </div>
  );
};

export default adminOrderDetail;
