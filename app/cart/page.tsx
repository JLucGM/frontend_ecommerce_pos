"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div >
      <h1 className="pt-96">Carrito de compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <h2>{item.product_name}</h2>
              <p>Precio: ${item.product_price}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
          <button onClick={clearCart}>Vaciar carrito</button>
        </div>
      )}
    </div>
  );
}