const getAllProducts = async (token) => {
  const response = await fetch('http://localhost:3001/products', {
    headers: {
      authorization: token,
    },
  });
  const products = await response.json();
  return products;
};

export default getAllProducts;
