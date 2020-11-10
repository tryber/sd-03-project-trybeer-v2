// Referência usada para cria a função de formatar data:
// https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript

const formatDate = (date) => {
  const formatedDate = new Date(date);
  const day = formatedDate.getDate().toString();
  const month = (formatedDate.getMonth() + 1).toString();
  const formatedDay = day.length === 1 ? `0${day}` : day;
  const formatedMonth = month.length === 1 ? `0${month}` : month;
  return `${formatedDay}/${formatedMonth}`;
};

export default formatDate;
