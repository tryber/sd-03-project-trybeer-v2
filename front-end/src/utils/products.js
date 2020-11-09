const zero = 0;

const fetchProducts = async () => {
  try {
    const result = await fetch('http://localhost:3001/products/all');
    const json = await result.json();
    return json;
  } catch (error) {
    return (error.message);
  }
};

const getCartAtLocalStorage = (callback) => {
  // numero 0 armazenado em uma variavel para evitar warning do Eslint
  const localProductCart = localStorage.getItem('productCart');
  return localProductCart && localProductCart.length > zero
    ? callback(JSON.parse(localStorage.getItem('productCart')))
    : null;
};

const raiseProductQuantity = (product, productList, callback) => {
  const productIndex = productList.map((element) => element.id).indexOf(product.id);
  productList[productIndex].quantity += 1;
  callback(productList);
  return null;
};

const createProductAtCart = (product, productList, callback) => {
  product.quantity = 1;
  productList.push(product);
  callback(productList);
  return null;
};

const addProductToCart = (product, productList, callback) => {
  const isProductAlreadyAtCart = productList.find(
    (element) => element.id === product.id,
  );
  return isProductAlreadyAtCart
    ? raiseProductQuantity(product, productList, callback)
    : createProductAtCart(product, productList, callback);
};

const removeProductFromCart = (product, productList, callback) => {
  const productIndex = productList.map((element) => element.id).indexOf(product.id);
  productList[productIndex].quantity -= 1;
  if (productList[productIndex].quantity < 1) productList.splice(productIndex, 1);
  callback(productList);
};

const saveCartAtLocalStorage = (productList) => {
  const stringfiedProductList = JSON.stringify(productList);
  localStorage.setItem('productCart', stringfiedProductList);
};

const getQuantityFromCart = (productId, productList) => {
  const product = productList.find((element) => element.id === productId);
  return product ? product.quantity : zero;
};

const formatPrice = (price) => price.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const getCartTotal = (productList) => {
  const total = productList.reduce(
    (acc, product) => acc + (product.price * product.quantity), zero,
  );
  const formatedTotal = total.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatedTotal;
};

export {
  zero,
  fetchProducts,
  getCartAtLocalStorage,
  addProductToCart,
  removeProductFromCart,
  saveCartAtLocalStorage,
  getQuantityFromCart,
  formatPrice,
  getCartTotal,
};
