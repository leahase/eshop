import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IOrder} from "../models/Order";
import { fetchOrderById, updateOrder, updateOrderItem, deleteOrderItem } from "../services/orderService";

export const UpdateOrder = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const navigate = useNavigate();
  const params = useParams(); 

  useEffect(() => {
    if (!params.id) return;

    fetchOrderById(params.id.toString()).then((data) => {
      console.log(data);
      setOrder(data);
    });  
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!order) return;
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (!order) return;

    const updatedItems = order.order_items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setOrder({ ...order, order_items: updatedItems });
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!window.confirm("are you sure you want to remove this item?")) return;

    try {
      await deleteOrderItem(itemId);
      if (!order) return;

      const updatedItems = order.order_items.filter((item) => item.id !== itemId);
      setOrder({ ...order, order_items: updatedItems });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!order) return;

    try {
      await updateOrder(order.id, {
        order_status: order.order_status,
        payment_status: order.payment_status,
      });
      for (const item of order.order_items) {
        await updateOrderItem(item.id, { quantity: item.quantity });
      }

      alert("Order updated");
      navigate("/admin/manageorders"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update order</h2>

      <form onSubmit={handleSubmit}>
        <label>Order status:</label>
        <select name="order_status" value={order?.order_status ?? ""} onChange={handleChange}>
          <option value="pending">pending</option>
          <option value="processing">processing</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
        </select>

        <label>Payment status:</label>
        <select name="payment_status" value={order?.payment_status ?? ""} onChange={handleChange}>
          <option value="unpaid">unpaid</option>
          <option value="paid">paid</option>
        </select>

        <h3>items</h3>
        <ul>
          {order?.order_items.map((item) => (
            <li key={item.id}>
              <strong>{item.product_name}</strong>  
              <br />
              Quantity:  
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
              />
              <button type="button" onClick={() => handleDeleteItem(item.id)}>Delete this item</button>
            </li>
          ))}
        </ul>

        <button type="submit">Save changes</button>
        <Link to="/admin/manageorders">Back</Link>
      </form>
    </div>
  );
};
