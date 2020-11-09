import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ProductCard from '../../../components/Client/ClientProducts/ProductCard';
import CheckoutButton from '../../../components/Client/ClientCheckout/CheckoutButton/CheckoutButton';
import ClientNavBar from '../../../components/Client/ClientNavBar/ClientNavBar';
import ProductContext from '../../../context/ProductContext';
import { fetchProducts, getCartAtLocalStorage } from '../../../utils/products';

const ProductsPage = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { productCart, setProductCart } = useContext(ProductContext);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts().then((data) => setProducts(data));
    setIsLoading(false);
    getCartAtLocalStorage(setProductCart);
  }, [setProductCart]);

  useEffect(() => () => {
    setProducts(null);
    setIsLoading(false);
  }, [productCart]);

  if (!userData) return <Redirect to="/login" />;
  return isLoading ? <h1>Carregando...</h1> : (
    <div>
      <ClientNavBar title="TryBeer" />
      <div style={{overflowY :"scroll", display: "flex", flexDirection: "column", height: "485px", margin: "0", width: "330px", padding: "15px"}}>
        { Array.isArray(products)
          ? products.map((product, i) => (
            <ProductCard
              key={ product.name }
              product={ product }
              index={ i }
            />))
          : null }
      <CheckoutButton />
      </div>
    </div>
  );
};

export default ProductsPage;
