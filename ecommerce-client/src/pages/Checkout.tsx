import { FormEvent, useState } from "react";
import { useCart } from "../Context/CartContext";


export const Checkout = () => {
  const { cart } = useCart(); 
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: ""
  });

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({...customer, [e.target.name]: e.target.value})
  }
  
  
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
        body: JSON.stringify({ cart, customer }), 
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
            {item.product.name} - {item.quantity} x {item.product.price} €
          </li>
        ))}
       <h3>Your total today is: {totalCartPrice} €</h3>
      </ul>

      <form onSubmit={handleSubmit}>
         <input 
            name="firstname"  
            value={customer.firstname}    
            onChange={handleChange} 
            placeholder="First name" 
            required 
            />

        <input 
            name="lastname"    
            value={customer.lastname} 
            onChange={handleChange} 
            placeholder="Last name" 
            required 
            />

        <input 
            name="email" 
            value={customer.email} 
            onChange={handleChange} 
            placeholder="Email" 
            required 
            />
        <input 
            name="phone" 
            value={customer.phone} 
            onChange={handleChange} 
            placeholder="Phone" 
            required
            />

        <input 
            name="street_address" 
            value={customer.street_address} 
            onChange={handleChange} 
            placeholder="Address" 
            required
            />
        <input 
            name="postal_code" 
            value={customer.postal_code} 
            onChange={handleChange} 
            placeholder="Postal code" 
            required
            />
        <input 
            name="city" 
            value={customer.city} 
            onChange={handleChange} 
            placeholder="City" 
            required
            />
        <input 
            name="country" 
            value={customer.country} 
            onChange={handleChange} 
            placeholder="Country" 
            required
            />
        <h3>payment</h3>
        <button type="submit">continue to checkout</button>
      </form>
    </>
  );
};
