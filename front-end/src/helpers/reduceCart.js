const zero = 0;

export default function cartTotal(cart) {
  return cart.reduce((acc, item) => acc + (item.price * item.quantity), zero);
}
