import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './context';
import { allProducts, allSales, allSalesProducts } from '../../services/trybeerUserAPI';

const RecipeAppProvider = ({ children }) => {
  const [newUser, setNewUser] = useState([]);
  const [token, setToken] = useState(null);
  const [salesProduct, setSalesProduct] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchSaleAdmin = async () => {
    const listSales = await allSales();
    const listSalesProducts = await allSalesProducts();
    setSales(listSales.data);
    setSalesProduct(listSalesProducts.data);
  };

  const fetchSaleUser = async (info) => {
    const listSales = await allSales(info);
    const listSalesProducts = await allSalesProducts();
    setSales(listSales.data);
    setSalesProduct(listSalesProducts.data);
  };

  const fetchData = async (info) => {
    const listProducts = await allProducts();
    setProducts(listProducts.data);
    if (info.role === 'administrator') {
      await fetchSaleAdmin(setSales, setSalesProduct);
      return;
    }
    await fetchSaleUser(info, setSales, setSalesProduct);
  };

  const context = {
    newUser,
    setNewUser,
    token,
    setToken,
    salesProduct,
    setSalesProduct,
    sales,
    setSales,
    products,
    fetchData,
  };

  return (
    <TrybeerContext.Provider value={ context }>
      {children}
    </TrybeerContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
