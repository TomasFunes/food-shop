import { useContext } from "react";
import { ShopContext } from "./ShopContext";


export default function Cart() {
  const {incrementProductQuantity, decrementProductQuantity, cart} = useContext(ShopContext);

  const totalPrice = cart.reduce((currentPrice, meal) => currentPrice + (meal.price * meal.quantity), 0);


  if (cart.length === 0)
    return(
      <div>
        <p>Eliga algun producto antes de realizar su pedido</p>
      </div>
    )

  return (
    <div>
      <ul className="cart">
        {cart.map((meal) => {
          return (
            <li key={meal.name} className="cart-item">
              <p>
                {meal.name} - {meal.quantity} x ${meal.price}
              </p>
              <div className="cart-item-actions">
                <button onClick={() => decrementProductQuantity(meal.name)}>-</button>
                <p>{meal.quantity}</p>
                <button onClick={() => incrementProductQuantity(meal.name)}>+</button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="total-price">Total: ${totalPrice}</p>
    </div>
  );
}
