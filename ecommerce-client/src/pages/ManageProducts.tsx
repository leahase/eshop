import { useEffect, useState } from "react";
import { IProduct } from "../models/Product";
import { fetchProducts, deleteProduct } from "../services/productService";

export const ManageProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("do u really want to delete this product?")) return;
    await deleteProduct(id);
    const deletedProduct = products.filter((product) => product.id !== id);
    setProducts(deletedProduct);
  };

  return (
    <div>
      <h2>manage products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}  ${product.price} 
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

