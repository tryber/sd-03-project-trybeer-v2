export const saveToLocalStorage = (info, name = 'user') => {
  localStorage.setItem(name, JSON.stringify(info));
};

export const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user'));

export const getCartFromLocalStorage = () => JSON.parse(localStorage.getItem('cart'));
