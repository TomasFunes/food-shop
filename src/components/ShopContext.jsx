import { createContext, useState } from "react";

export const ShopContext = createContext({
  cart: [],
  addProductToCart: () => {},
  incrementProductQuantity: () => {},
  decrementProductQuantity: () => {},
});

export default function ShopContextProvider({children}){
  const [cart, setCart] = useState([]);

  function handleAddProductToCart(productName, productPrice) {
    const productIsInCart = cart.some(
      (product) => product.name === productName
    );

    if (productIsInCart) {
      setCart((prevCart) =>
        prevCart.map((meal) => {
          if (meal.name === productName) {
            return {
              name: meal.name,
              quantity: meal.quantity + 1,
              price: meal.price,
            };
          }
          return meal;
        })
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { name: productName, quantity: 1, price: Number(productPrice) },
      ]);
    }
  }

  function handleIncrementProductQuantity(productName) {
    setCart((prevCart) =>
      prevCart.map((meal) => {
        if (meal.name === productName) {
          return {
            name: meal.name,
            quantity: meal.quantity + 1,
            price: meal.price,
          };
        }
        return meal;
      })
    );
  }

  function handleDecrementProductQuantity(productName) {
    setCart((prevCart) => {
      const meal = prevCart.find(
        (product) => product.name === productName
      );
      const newQuantity = meal.quantity - 1;
      if (newQuantity === 0)
        return prevCart.filter((meal) => meal.name !== productName);
      else {
        return prevCart.map((meal) => {
          if (meal.name === productName) {
            return {
              name: meal.name,
              quantity: newQuantity,
              price: meal.price,
            };
          }
          return meal;
        });
      }
    });
  }



  const ctxValue = {
    cart,
    addProductToCart: handleAddProductToCart,
    incrementProductQuantity: handleIncrementProductQuantity,
    decrementProductQuantity: handleDecrementProductQuantity,
  }

  return (
    <ShopContext.Provider value={ctxValue}>
      {children}
    </ShopContext.Provider>
  )
}