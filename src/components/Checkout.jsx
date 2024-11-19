import { forwardRef, useImperativeHandle, useRef, useContext } from "react";
import { ShopContext } from "./ShopContext";

const Checkout = forwardRef(function Checkout({}, ref) {
  const {cart} = useContext(ShopContext);
  const dialog = useRef();
  const successDialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
    close: () => dialog.current.close()
  }))

  function handleCancel() {
    dialog.current.close();
  }

  async function handleOrder(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const userInput = Object.fromEntries(fd.entries());

    const order = {
      customer: userInput,
      items: cart,
    };

    const response = await fetch("https://food-api-9wi2.onrender.com/orders", {
      method: "POST",
      body: JSON.stringify({ order }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message);
    }

    dialog.current.close();
    successDialog.current.showModal();
  }


  return(
    <>
    <dialog ref={successDialog} className="modal">
      <h2>Pedido realizado</h2>
      <p>Excelente! Ya estamos realizando su pedido.</p>
      <form method="dialog">
        <button className="button">OK!</button>
      </form>
    </dialog>
    <dialog ref={dialog} className="modal">
      <h2>Detalles de entrega</h2>
      <form onSubmit={handleOrder} className="control">
        <div className="control-row">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="control-row">
          <label htmlFor="street">Direccion</label>
          <input type="text" id="street" name="street" required />
        </div>
        <div className="control-row">
          <label htmlFor="city">Ciudad</label>
          <input type="text" id="city" name="city" required />
        </div>
        <div className="control-buttons">
          <button className="button">Ordenar Pedido</button>
          <button type="button" onClick={handleCancel} className="text-button">Cancelar</button>
        </div>
      </form>
    </dialog>
    </>
  );
});

export default Checkout;