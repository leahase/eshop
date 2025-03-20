import { FormEvent } from "react";
import { useCart } from "../Context/CartContext";

export const Checkout = () => {
  const { cart } = useCart(); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("empty cart");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ cart }), 
      });

      const data = await response.json();
      console.log(data.checkout_url);
      window.location.href = data.checkout_url; 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Checkout</h1>
      <h3>cart</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.product.id}>
            {item.product.name} - {item.quantity} x {item.product.price} kr
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h3>payment</h3>
        <p>...</p>
        <button type="submit">to checkout</button>
      </form>
    </>
  );
};
