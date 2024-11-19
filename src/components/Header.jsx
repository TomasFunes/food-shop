import { useContext, useRef, useState } from "react";
import { motion } from 'framer-motion';


import CartModal from "./CartModal";
import Checkout from "./Checkout";
import { ShopContext } from "./ShopContext";

const vibrationVariants = {
  vibrate: {
    x: [0, -10, 10, -10, 10, 0], // Desplazamiento en el eje X
    transition: {
      duration: 0.5, // Duración de la animación
      ease: "easeInOut",
    },
  },
};

export default function Header() {
  const cartModal = useRef();
  const checkoutModal = useRef();
  const { cart } = useContext(ShopContext);

  function handleOpenCart() {
    cartModal.current.open();
  }

  function handleOpenCheckout() {
    if (cart.length !== 0) {
      cartModal.current.close();
      checkoutModal.current.open();
    }
  }

  return (
    <div id="main-header">
      <h1>
        em<span>pana</span>das
      </h1>
      <motion.button
        className="button"
        onClick={handleOpenCart}
        variants={vibrationVariants}
        animate={cart.length > 0 ? "vibrate" : ""}
      >
        🛒
      </motion.button>
      <CartModal ref={cartModal} onCheckout={handleOpenCheckout} />
      <Checkout ref={checkoutModal} />
    </div>
  );
}
