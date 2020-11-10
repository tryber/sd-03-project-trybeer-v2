import React from 'react';
import PropTypes from 'prop-types';
import OrderCard from '../orderCard/OrderCard';
import './ListOrdersCards.css'

function ListOrdersCards({ orders }) {
  return (
    <div id="wrapper" className="orders-page orders-list" style={ { display: 'flex', flexDirection: 'row' } }>
      {orders.map((order, index) => (
        <OrderCard order={ order } index={ index } key={ order.id } />
      ))}
    </div>
  );
}

export default ListOrdersCards;

ListOrdersCards.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      totalPrice: PropTypes.number,
      saleDate: PropTypes.string,
    }),
  ).isRequired,
};
