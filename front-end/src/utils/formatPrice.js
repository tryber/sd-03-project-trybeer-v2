const formatPrice = (price) => {
  const decimal = 2;
  const priceString = price.toFixed(decimal).toString();
  const priceArray = priceString.split('.');
  const newPrice = priceArray.join(',');
  return newPrice;
};

export default formatPrice;
