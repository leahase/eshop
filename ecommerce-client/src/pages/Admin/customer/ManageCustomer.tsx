import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCustomer, fetchCustomers } from "../../../services/customerService";
import { ICustomer } from "../../../models/Customer";

export const ManageCustomers = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    const getCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    getCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("do u really want to delete this product?")) return;
    await deleteCustomer(id);
    const deletedCustomer = customers.filter((customers) => customers.id !== id);
    setCustomers(deletedCustomer);
  };

  return (
    <div>
      <h2>manage customer</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.firstname} {customer.lastname}
            
            <Link to={`/admin/managecustomers/update/${customer.id}`} >
                Update
              </Link>
            <button onClick={() => handleDelete(customer.id)}>Delete</button>
          </li>
        ))}
        <h3>Create new customer</h3>
         <Link to ={`/admin/managecustomers/create/`}>Create
         </Link>
      </ul>
    </div>
  );
};

