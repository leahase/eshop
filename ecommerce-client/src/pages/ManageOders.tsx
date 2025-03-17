import { useEffect, useState } from "react";
import { IOrder } from "../models/Order";
import { fetchOrders } from "../services/orderService";


export const ManageOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]); 

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        console.log(data); 
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>no orders found</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Customer:</strong> {order.customer_firstname} {order.customer_lastname} <br />
              <strong>Total Price:</strong> {order.total_price} <br />
              <strong>Status:</strong> {order.order_status} <br />
              <strong>Created At:</strong> {new Date(order.created_at).toLocaleDateString()} <br />
              
              
              <h3>Products in order</h3>
              <ul>
              {order.order_items && order.order_items.length > 0 ? (
                order.order_items.map((item) => (
                    <li key={item.id}>
                    {item.product_name} - {item.quantity}x (${item.unit_price} each)
                    </li>
                ))
                ) : (
                <p>no products in the order</p>
                )}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
