import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { CartProvider } from './Context/CartContext';

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App
