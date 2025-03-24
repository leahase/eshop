import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/productService";
import { IProduct, Product } from "../models/Product";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import { CartItem } from "../models/CartItem";
import { CartActionType } from "../reducers/CartReducer";

export const ProductById = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { dispatch } = useCart();
  
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

const handleAddToCart = (product: Product) => {
    dispatch({
      type: CartActionType.ADD_ITEM,
      payload: new CartItem(product, 1),
    });
    toast.success(`One ${product.name} has been added to the cart!`);
  }; 
  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: "300px"}} />
      <p>Pris: {product.price}€</p>
      <p>{product.description}</p>
      <p>productID: {product.id}</p>
      <button onClick={() => handleAddToCart(product)}> add to cart</button>
    </div>
  );
};

