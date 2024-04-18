
export const addToCart = (products) => {
  const storedCart = localStorage.getItem('cart');
  let newCart = [];
  if (storedCart) {
    newCart = JSON.parse(storedCart);
  }
  newCart = [...newCart, ...products];
  localStorage.setItem('cart', JSON.stringify(newCart));
};
