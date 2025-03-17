import axios from "axios";
import { API_URL } from "./baseService";
import { IOrder } from "../models/Order";

export const fetchOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await axios.get<IOrder[]>(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
