import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/utils';
import { ProductsContext } from '../../../contexts/ProductsContext';
import Card from '../styles/ProductCard';

const ProductCard = ({ index, id, name, price, urlImage, quantity }) => {
  const { addQuantity, subQuantity } = useContext(ProductsContext);

  return (
    <Card>
      <div className="product-image">
        <img data-testid={`${index}-product-img`} src={urlImage} alt={name} />
      </div>
      <p data-testid={`${index}-product-name`} className="product-name">
        {name}
      </p>
      <p data-testid={`${index}-product-price`} className="price">
        {formatPrice(price)}
      </p>
      <div>
        <button data-testid={`${index}-product-plus`} type="button" onClick={() => addQuantity(id)}>
          <i className="material-icons">add</i>
        </button>
        <span data-testid={`${index}-product-qtd`}>{quantity}</span>
        <button
          data-testid={`${index}-product-minus`}
          type="button"
          onClick={() => subQuantity(id)}
        >
          <i className="material-icons">remove</i>
        </button>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
