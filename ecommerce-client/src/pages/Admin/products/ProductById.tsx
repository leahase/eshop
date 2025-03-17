import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../../../models/Product";
import { fetchProductById } from "../../../services/productService";


export const ProductById = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  
  useEffect(() => {
    if (!id) return;

    const getProductDetails = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProductDetails();
  }, [id]);

  if (!product) return <p>Loading</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: "300px"}} />
      <p>Pris: {product.price}</p>
      <p>{product.description}</p>
      <p>productID: {product.id}</p>
    </div>
  );
};

