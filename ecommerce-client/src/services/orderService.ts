import axios from "axios";
import { API_URL } from "./baseService";
import { IOrder, IOrderItem } from "../models/Order";

export const fetchOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await axios.get<IOrder[]>(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteOrder = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/orders/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchOrderById = async (id: string | number ): Promise<IOrder> => {
  try {
    const response = await axios.get<IOrder>(`${API_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchOrderItems = async (orderId: string): Promise<IOrderItem[]> => {
  try {
    const response = await axios.get<IOrderItem[]>(`${API_URL}/order-items/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
