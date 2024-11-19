import { useContext } from "react";
import { ShopContext } from "./ShopContext";

export default function Product({ name, price, description, image }) {
  const { addProductToCart } = useContext(ShopContext);

  return (
    <div className="product">
      <img src={image} alt="product image" />
      <h2>{name}</h2>
      <span className="product-price">$ {price}</span>
      <p>{description}</p>
      <button className="button" onClick={() => addProductToCart(name, price)}>
        Añadir
      </button>
    </div>
  );
}
