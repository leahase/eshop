import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../services/productService";
import { IProduct } from "../../models/Product";

export const UpdateProduct = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const navigate = useNavigate();
  const params = useParams(); 
  

  useEffect(() => {
    if (!params.id) return;
    fetchProductById(params.id).then((data) => setProduct(data));  
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!product) return;
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    await updateProduct(product.id, {
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });

    navigate("/admin/manageproducts"); 
  };

  return (
    <div>
      <h2>Update Product</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={product?.name ?? ""} 
          onChange={handleChange} 
        />

        <input 
          type="number" 
          name="price" 
          value={product?.price ?? ""} 
          onChange={handleChange} 
        />

        <input 
          type="text" 
          name="image" 
          value={product?.image ?? ""} 
          onChange={handleChange} 
        />

        <input 
          type="text" 
          name="description" 
          value={product?.description ?? ""} 
          onChange={handleChange} 

        />

        <button>Save changes</button>
        <Link to="/admin/manageproducts">Back</Link>
      </form>
    </div>
  );
};

