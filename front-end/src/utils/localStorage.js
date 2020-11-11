export const getProductsLocalStorage = (key) => {
  const products = JSON.parse(localStorage.getItem(key));
  return products || [];
};

export const removeLocalStorage = (productName) => {
  const products = getProductsLocalStorage('cart');
  const newProductList = products.filter((element) => element.productName !== productName);
  localStorage.setItem('cart', JSON.stringify(newProductList));
  return null;
};

export const updateProductInLocalStorage = (name, quantity) => {
  const products = getProductsLocalStorage('cart');
  const newProductList = products.map((element) => {
    if (element.productName === name) return { ...element, quantity };
    return element;
  });
  localStorage.setItem('cart', JSON.stringify(newProductList));
  return null;
};

export const addProductToLocalStorage = (product) => {
  const { productName, quantity } = product;
  const products = JSON.parse(localStorage.getItem('cart')) || [];
  if (products.some((element) => element.productName === productName)) {
    return updateProductInLocalStorage(productName, quantity);
  }
  const newProductList = products.concat(product);
  localStorage.setItem('cart', JSON.stringify(newProductList));
  return null;
};
