import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ProductsContext } from '../../contexts/ProductsContext';
import ProductCard from './components/ProductCard';
import Auth from '../../utils/Auth';
import MenuTop from '../../components/MenuTop';
import { formatPrice } from '../../utils/utils';
import CardsContainer from './styles/CardsContainer';
import ProductsFooter from './styles/ProductsFooter';
import CardSkeleton from './components/CardSkeleton';

const zero = 0;

const renderSkeleton = (count) => {
  const skeleton = [];
  for (let i = 0; i < count; i++) skeleton.push(<CardSkeleton />);
  return skeleton;
}

const Products = () => {
  const { products, cartTotalPrice, message } = useContext(ProductsContext);
  return (
    <Auth>
      <MenuTop title="TryBeer" />
      <CardsContainer>
        {(!products || products.length === zero) ?
          renderSkeleton(11)
          : products.map(({ id, name, price, urlImage, quantity }, index) => (
          <ProductCard
            key={id}
            index={index}
            id={id}
            name={name}
            price={price}
            urlImage={urlImage}
            quantity={quantity}
          />
        ))}
      </CardsContainer>
      <ProductsFooter>
        <Link to="/checkout">
          <button type="button" data-testid="checkout-bottom-btn" disabled={!cartTotalPrice}>
            Ver Carrinho
          </button>
        </Link>
        <span data-testid="checkout-bottom-btn-value">Preço total: {formatPrice(cartTotalPrice)}</span>
        <span>{message}</span>
      </ProductsFooter>
    </Auth>
  );
};

export default Products;
