import axios from "axios";
import { IProduct } from "../models/Product";
import { API_URL } from "./baseService";


export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axios.get<IProduct[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const fetchProductById = async (id: string): Promise<IProduct> => {
  try {
    const response = await axios.get<IProduct>(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const createProduct = async (product: IProduct): Promise<IProduct> => {
  try {
    const response = await axios.post<IProduct>(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const updateProduct = async (id: string, product: Partial<IProduct>): Promise<IProduct> => {
  try {
    const response = await axios.patch<IProduct>(`${API_URL}/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
