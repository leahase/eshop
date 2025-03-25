import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { CartProvider } from './Context/CartContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    
    <CartProvider>
       <ToastContainer />
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App
