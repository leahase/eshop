import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ICustomer } from "../../../models/Customer";
import { fetchCustomerById, updateCustomer } from "../../../services/customerService";

export const UpdateCustomer = () => {
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    if (!id) return;
    
    fetchCustomerById(id).then((data) => {
      console.log(data);
      setCustomer(data);
    });  
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!customer) return;
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    try {
      await updateCustomer(customer.id, {
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        street_address: customer.street_address,
        postal_code: customer.postal_code,
        city: customer.city,
        country: customer.country
      });

      alert("updated");
      navigate("/admin/managecustomers");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Customer</h2>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name="firstname" 
          value={customer?.firstname ?? ""} 
          onChange={handleChange} 
          required 
          />

          <input 
          type="text" 
          name="lastname" 
          value={customer?.lastname ?? ""} 
          onChange={handleChange} 
          required 
          />
          <input 
          type="email" 
          name="email" 
          value={customer?.email ?? ""} 
          onChange={handleChange} 
          required />

          <input 
          type="text" 
          name="phone" 
          value={customer?.phone ?? ""} 
          onChange={handleChange} 
          />
          <input 
          type="text" 
          name="street_address" 
          value={customer?.street_address ?? ""} 
          onChange={handleChange} 
          />
          <input 
          type="text" 
          name="postal_code" 
          value={customer?.postal_code ?? ""} 
          onChange={handleChange} 
          />
          <input 
          type="text" 
          name="city" 
          value={customer?.city ?? ""} 
          onChange={handleChange} 
          />
          <input 
          type="text" 
          name="country" 
          value={customer?.country ?? ""} 
          onChange={handleChange}  
          />

          <button type="submit">Save</button>
          <Link to="/admin/managecustomers">Back</Link>
        </form>
    </div>
  );
};
