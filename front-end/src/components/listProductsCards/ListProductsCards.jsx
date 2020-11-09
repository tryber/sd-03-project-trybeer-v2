import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../productCard/ProductCard';
import CartButton from '../cartButton/CartButton';
import './ListProductsCards.css';

function ListProductsCards({ products, getTotalPrice, totalPrice }) {
  return (
    <div className="cards-list">
      {products.map((product, index) => (
        <ProductCard
          product={ product }
          index={ index }
          key={ product.id }
          getTotalPrice={ getTotalPrice }
        />
      ))}
      <CartButton totalPrice={ totalPrice } />
    </div>
  );
}

export default ListProductsCards;

ListProductsCards.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
      id: PropTypes.number,
    }),
  ).isRequired,
  getTotalPrice: PropTypes.func.isRequired,
  totalPrice: PropTypes.string.isRequired,
};
