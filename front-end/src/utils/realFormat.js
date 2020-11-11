const zero = 0;
const realFomat = (number = zero) => number.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default realFomat;
