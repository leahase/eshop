import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./pages/Admin/Admin";
import { Products }  from "./pages/Products";
import { Home } from "./pages/Home";
import { Errorpage } from "./pages/Errorpage";
import { Layout } from "./pages/Layout";
import { ProductById } from "./pages/ProductById";
import { ManageProducts } from "./pages/Admin/ManageProducts";
import { UpdateProduct} from "./pages/Admin/UpdateProduct";

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

        ]
    }
])