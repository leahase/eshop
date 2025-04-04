import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./pages/Admin/Admin";
import { Products }  from "./pages/Products";
import { Home } from "./pages/Home";
import { Errorpage } from "./pages/Errorpage";
import { Layout } from "./pages/Layout";
import { ProductById } from "./pages/ProductById";
import { ManageProducts } from "./pages/Admin/ManageProducts";
import { UpdateProduct} from "./pages/Admin/UpdateProduct";
import { CreateCustomer } from "./pages/Admin/customer/CreateCustomer";
import { ManageCustomers } from "./pages/Admin/customer/ManageCustomer";
import { CreateProduct } from "./pages/CreateProduct";
import { ManageOrders } from "./pages/ManageOders";
import { UpdateCustomer } from "./pages/Admin/customer/UpdateCustomer";
import { UpdateOrder } from "./pages/UpdateOrder";
import { Cart } from "./components/Cart";
import { Checkout } from "./pages/Checkout";
import { Confirmation } from "./components/Confirmation";






export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement:<Errorpage />,
        children: [
            {
                path: "/",
                element:<Home/>
            },
            {
                path: "/Admin",
                element:<Admin/>
            },
           
            {
                path: "/Admin/manageproducts",
                element:<ManageProducts/>

            },
            {
                path: "/Admin/manageproducts/create",
                element:<CreateProduct/>

            },
            {
                path: "/admin/manageproducts/update/:id",
                element: <UpdateProduct/>
            },
            {
                path: "/Products",
                element: <Products/>
            },
            {
                path: "/products/:id",
                 element: <ProductById/>
            },


            {
                path: "/Admin/managecustomers",
                element:<ManageCustomers/>

            },
            {
                path: "/Admin/managecustomers/create",
                element:<CreateCustomer/>

            },

            {
                path: "/admin/managecustomers/update/:id",
                element: <UpdateCustomer/>
            },

            {
                path: "/admin/manageorders",
                element: <ManageOrders />,
            },
            {
                path: "/admin/manageorders/update/:id",
                element: <UpdateOrder/>
            },
            { 
                path: "/cart", 
                element: <Cart /> 
            },      
            {
                path:"/checkout",
                element: <Checkout />
            },
            {
                path: "/confirmation",
                element: <Confirmation />
            },
                
        ]
    }
])