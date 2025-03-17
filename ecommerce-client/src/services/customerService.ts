import axios from "axios";
import { API_URL } from "./baseService";
import { ICustomer } from "../models/Customer";


export const fetchCustomers = async (): Promise<ICustomer[]> => {
  try {
    const response = await axios.get<ICustomer[]>(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCustomerById = async (id: string): Promise<ICustomer> => {
  try {
    const response = await axios.get<ICustomer>(`${API_URL}/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const createCustomer = async (customer: Omit<ICustomer, "id">): Promise<ICustomer> => {
    try {   
      const response = await axios.post<ICustomer>(`${API_URL}/customers`, customer);
      return response.data;
    } catch (error) {
      console.error(error);  
      throw error;
    }
  };


export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/customers/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCustomer = async (id: string, customer: Partial<ICustomer>): Promise<ICustomer> => {
  try {
    const response = await axios.patch<ICustomer>(`${API_URL}/customers/${id}`, customer);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};
