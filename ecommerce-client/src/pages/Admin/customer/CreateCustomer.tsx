import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../../services/customerService";
import { ICustomer } from "../../../models/Customer";

export const CreateCustomer = () => {
  const [customer, setCustomer] = useState<Omit<ICustomer, "id">>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
    created_at: new Date().toISOString(), 
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createCustomer(customer);  
      alert("created");
      navigate("/admin/managecustomers");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstname" value={customer.firstname} onChange={handleChange} placeholder="Firstname" required />
        <input type="text" name="lastname" value={customer.lastname} onChange={handleChange} placeholder="Lastname" required />
        <input type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={customer.password} onChange={handleChange} placeholder="Password" required />
        <input type="text" name="phone" value={customer.phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="street_address" value={customer.street_address} onChange={handleChange} placeholder="Street Address" />
        <input type="text" name="postal_code" value={customer.postal_code} onChange={handleChange} placeholder="Postal Code" />
        <input type="text" name="city" value={customer.city} onChange={handleChange} placeholder="City" />
        <input type="text" name="country" value={customer.country} onChange={handleChange} placeholder="Country" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
