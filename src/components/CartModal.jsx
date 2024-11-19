import { useRef, forwardRef, useImperativeHandle } from "react";
import Cart from "./Cart";

const CartModal = forwardRef(function CartModal({ onCheckout }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
    close: () => dialog.current.close(),
  }));

  function handleCancel() {
    dialog.current.close();
  }

  return (
    <>
      <dialog ref={dialog} className="modal">
        <h2>Tu pedido</h2>
        <Cart />
        <div className="control-buttons">
          <button className="button" onClick={onCheckout}>
            Confirmar
          </button>
          <button onClick={handleCancel} className="text-button">
            Cancelar
          </button>
        </div>
      </dialog>
    </>
  );
});

export default CartModal;
