import { useCart } from "../Context/CartContext";
import { CartActionType } from "../reducers/CartReducer";
import { CartItem } from "../models/CartItem";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, dispatch } = useCart();

  const totalCartPrice = cart.reduce(
    (total: number, item: CartItem) => total + item.quantity * item.product.price,
    0
  );

  const handleIncreaseQuantity = (product: CartItem["product"]) => {
    dispatch({ type: CartActionType.CHANGE_QUANTITY, payload: { product, quantity: 1 } });
  };

  const handleDecreaseQuantity = (product: CartItem["product"]) => {
    dispatch({ type: CartActionType.CHANGE_QUANTITY, payload: { product, quantity: -1 } });
  };

  const handleRemoveItem = (product: CartItem["product"]) => {
    dispatch({ type: CartActionType.REMOVE_ITEM, payload: { product } });
  };

  const handleResetCart = () => {
    dispatch({ type: CartActionType.RESET_CART });
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item: CartItem) => (
          <li key={item.product.id}>
            {item.product.name} - {item.quantity} x {item.product.price} euro
            <button onClick={() => handleIncreaseQuantity(item.product)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item.product)}>-</button>
            <button onClick={() => handleRemoveItem(item.product)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: {totalCartPrice} euro</h3>
      <button onClick={handleResetCart}>Reset Cart</button>
      <Link to="/checkout">
        <button>Checkout</button>
     </Link>

    </div>
  );
};
