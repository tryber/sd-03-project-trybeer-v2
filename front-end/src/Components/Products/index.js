import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BeerCard from '../BeerCard';
import BeerContext from '../../Context/BeerContext/BeerContext';
import MenuBar from '../MenuBar';
import './styles.css';

const ProductsPage = () => {
  const initialValue = 0;
  const { total, products } = useContext(BeerContext);

  return (
    <div className="products-list">
      <MenuBar titleName="TryBeer" />
      {products.map(({
        id, name, price, url_image: imageURL, quantity,
      }, index) => (
        <BeerCard
          id={ id }
          productName={ name }
          price={ price }
          imageURL={ imageURL }
          initialQuantity={ quantity }
          index={ index }
          key={ name }
        />
      )) }
      <Link to="/checkout">
        <button
          disabled={ total === initialValue }
          type="button"
          data-testid="checkout-bottom-btn"
          className="checkout-btn"
        >
          Ver Carrinho
          <span data-testid="checkout-bottom-btn-value">
            {`R$ ${total.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default ProductsPage;
