import { createContext, useContext, useReducer, PropsWithChildren, Dispatch, useEffect } from "react";
import { CartReducer } from "../reducers/CartReducer";
import { CartItem } from "../models/CartItem";

interface ICartContext {
  cart: CartItem[];
  dispatch: Dispatch<any>;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const initialCart = JSON.parse(localStorage.getItem("cart") || "[]")
  const [cart, dispatch] = useReducer(CartReducer, initialCart);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error;
  }
  return context;
};
