const checkOut = async (
  token,
  userId,
  totalPrice,
  delivery,
  saleDate,
  status,
  products,
) => {
  const response = await fetch('http://localhost:3001/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify({
      userId,
      totalPrice,
      delivery,
      saleDate,
      status,
      products,
    }),
  });
  return response.json();
};

export default checkOut;
