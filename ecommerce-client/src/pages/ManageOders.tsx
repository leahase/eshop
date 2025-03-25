import { useEffect, useState } from "react";
import { IOrder } from "../models/Order";
import { deleteOrder, fetchOrderById, fetchOrders } from "../services/orderService";
import { Link } from "react-router-dom";


export const ManageOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]); 

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        console.log(data);
        console.log(data); 
        const ordersWithItems = await Promise.all(
          data.map(async (order) => {
            const orderDetails = await fetchOrderById(order.id);
            return { ...order, order_items: orderDetails.order_items };
          })
        );
        setOrders(ordersWithItems);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

  const handleDelete = async (id: string) => {
      if (!window.confirm("do u really want to delete this order?")) return;
      await deleteOrder(id);
      const deletedOrder = orders.filter((order) => order.id !== id);
      setOrders(deletedOrder);
      alert(`your order with orderId:${id} was deleted`)
    };

    
    
  return (
    <div>
      <h2>Manage Orders</h2>
      <h3>Order:</h3>
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
              <strong>Payment Status:</strong> {order.payment_status} <br />
              <strong>Created At:</strong> {new Date(order.created_at).toLocaleDateString()} <br />
              <h4>Items</h4>
              <ul>
              {order.order_items?.map((item) => (
              <li key={item.id}>
                {item.product_name} - {item.quantity}x (${item.unit_price} each)
              </li>
            ))}

              </ul>
              <button onClick={() => handleDelete(order.id)}>Delete whole order</button>

              <Link to={`/admin/manageorders/update/${order.id}`} >Update order</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
