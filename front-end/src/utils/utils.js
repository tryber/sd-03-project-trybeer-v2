const zero = 0;

export const formatPrice = (price) => price.toLocaleString(
  'pt-BR',
  { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' },
);

export const calculateTotalPrice = (products) => products.reduce(
  (acc, { price, quantity }) => acc + (price * quantity),
  zero,
);
