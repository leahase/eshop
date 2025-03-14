import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import { IProduct } from "../models/Product";
import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <h1>Produkter</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/Products/${product.id}`}>
            <img src={product.image} style={{ width: "100px" }} />
            <h3>{product.name}</h3>
            <p>Pris: {product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
