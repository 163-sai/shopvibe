import React, { useEffect, useState, useContext } from 'react';


const CartItemCountContext = React.createContext();

export const useCartItemCount = () => useContext(CartItemCountContext);

const CartItemCountProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      const itemCount = cart.reduce((total, product) => total + product.quantity, 0);
      setCartItemCount(itemCount);
    }
  }, []);

  return (
    <CartItemCountContext.Provider value={cartItemCount}>
      {children}
    </CartItemCountContext.Provider>
  );
};

export { CartItemCountProvider };



// import React, { useEffect, useState } from 'react';

// const CartItemCount = () => {
//   const [cartItemCount, setCartItemCount] = useState(0);

//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       const cart = JSON.parse(storedCart);
//       const itemCount = cart.reduce((total, product) => total + product.quantity, 0);
//       setCartItemCount(itemCount);
//     }
//   }, []);

//   return <span>{cartItemCount}</span>;
// };

// export default CartItemCount;
