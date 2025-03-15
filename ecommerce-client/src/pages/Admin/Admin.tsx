import { Link } from "react-router-dom"

export const Admin = () => {
    return (
        <>
        <h1>admin</h1>
      <nav>
        <p></p><Link to="/admin/manageproducts">manage products</Link>
        <p></p><Link to="/admin/managecustomers">manage customer</Link>
        <p></p><Link to="/admin/orders">manage orders</Link>
      </nav>

        </>
    )
}