import { createContext, useContext, useReducer, PropsWithChildren, Dispatch } from "react";
import { CartReducer } from "../reducers/CartReducer";
import { CartItem } from "../models/CartItem";

interface ICartContext {
  cart: CartItem[];
  dispatch: Dispatch<any>;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, dispatch] = useReducer(CartReducer, []);

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
