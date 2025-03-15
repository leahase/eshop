import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../models/Product";
import { createProduct } from "../services/productService";


export const CreateProduct = () => {
  const [product, setProduct] = useState<IProduct>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: name === "price" ? Number(value) : value, });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
    await createProduct(product);  
      alert("created");
      navigate("/admin/manageproducts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
      <input type="id" name="id" value={product.id} onChange={handleChange} placeholder="product id" />
        <input type="name" name="name" value={product.name} onChange={handleChange} placeholder="product name" />
        <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="description" />
        <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="stock" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="price" />
        <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="image" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};