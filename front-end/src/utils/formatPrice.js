const formatPrice = (price) => {
  const priceString = price.toFixed(2).toString();
  const priceArray = priceString.split('.');
  const newPrice = priceArray.join(',');
  return newPrice;
};

export default formatPrice;
