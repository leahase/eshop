import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import { IProduct, Product } from "../models/Product";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { CartItem } from "../models/CartItem";
import { CartActionType } from "../reducers/CartReducer";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>{error}</p>;

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: CartActionType.ADD_ITEM,
      payload: new CartItem(product, 1),
    });
  }; 
  return (
    <div>
      <h1>Produkter</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ border: "2px solid red", padding: "10px 5px 10px 5px" }}>
            <img src={product.image} style={{ width: "100px" }} />
            <h3>{product.name}</h3>
            <p>Pris: {product.price}</p>
            <Link to={`/Products/${product.id}`}>Click for more info</Link>
            <button onClick={() => handleAddToCart(product)}> add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};
