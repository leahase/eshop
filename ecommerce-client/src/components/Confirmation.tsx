import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IOrder } from "../models/Order";

export const Confirmation = () => {
    const location = useLocation();
    const [order, setOrder] = useState< IOrder | null>(null);

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
      
    
    return (
        <>
        <h1> Order Confirmation</h1>
        <p>Order number: {order?.id}</p>

        </>
    );
}