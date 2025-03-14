import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Products } from "./pages/Products";
import { Home } from "./pages/Home";
import { Errorpage } from "./pages/Errorpage";
import { Layout } from "./pages/Layout";

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
            }
            ,
            {
                path: "/Products",
                element: <Products/>
            }
        ]
    }
])