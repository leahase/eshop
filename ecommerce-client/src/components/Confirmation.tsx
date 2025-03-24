import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IOrder } from "../models/Order";
import { useCart } from "../Context/CartContext";
import { CartActionType } from "../reducers/CartReducer";


export const Confirmation = () => {
    const location = useLocation();
    const [order, setOrder] = useState< IOrder | null>(null);
    const { dispatch } = useCart();

    const sessionId = new URLSearchParams(location.search).get("session_id");

    useEffect(() => {
        const fetchOrder = async () => {
          if (!sessionId) return; 
      
          try {
            const res = await fetch(`http://localhost:3000/orders/payment/${sessionId}`);
            const data = await res.json();
            setOrder(data);
          } catch (error) {
            console.error(Error);
          }
        };
      
        fetchOrder();
        
      }, [sessionId]);

      useEffect(() => {
        if (!order) return;
      
        localStorage.removeItem("cart");
        localStorage.removeItem("customer");
        dispatch({ type: CartActionType.RESET_CART });
      
        const updateOrder = async () => {
          try {
            const res = await fetch(`http://localhost:3000/orders/${order.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                payment_status: "Paid",
                payment_id: order.payment_id, 
                order_status: "Received",
              }),
            });
      
            const data = await res.json();
            console.log("updated", data);
          } catch (error) {
            console.error(error);
          }
        };
      
        updateOrder();
      }, [order]);
      
    
    return (
        <>
        <h1> Order Confirmation</h1>
        <h3>Order number: {order?.id}</h3>
        <p>{order?.customer_firstname} {order?.customer_lastname}</p>
       <p>Confirmation sent to: {order?.customer_email}</p>

       <h4>Order summary:</h4>
       <ul>
        {order?.order_items.map(item => (
          <li key={item.id}>
            {item.product_name} - {item.quantity}x {item.unit_price} € 
          </li>
        ))}
      </ul>
      <h4>Your total: {order?.total_price} €</h4>

        </>
    );
}