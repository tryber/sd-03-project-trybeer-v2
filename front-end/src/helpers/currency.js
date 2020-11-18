const two = 2;

export default function toBRCurrency(value) {
  return `R$ ${value.toFixed(two).toString().replace('.', ',')}`;
}
