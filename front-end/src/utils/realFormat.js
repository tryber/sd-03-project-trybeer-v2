const realFomat = (number) => number.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default realFomat;
