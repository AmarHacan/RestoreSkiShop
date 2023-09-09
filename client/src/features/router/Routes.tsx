import { createBrowserRouter } from "react-router-dom";
import App from "../../app/layout/App";
import path from "path";
import HomePage from "../homepage/HomePage";
import Catalog from "../Catalog/Catalog";
import ProductDetails from "../Catalog/productdetail";
import About from "../about/About";
import Contact from "../contact/Contact";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {path: '', element:<HomePage/>},
            {path: 'catalog', element:<Catalog/>},
            {path:'catalog/:id', element: <ProductDetails/>},
            {path:'about', element:<About/>},
            {path:'contact', element:<Contact/>},
        ]
    }
])