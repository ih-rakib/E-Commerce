import {
    createBrowserRouter
} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/categories/CategoryPage";
import Search from "../pages/search/Search";
import Shop from "../pages/shop/Shop";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import NotFound from "../pages/error/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/categories/:categoryName",
                element: <CategoryPage></CategoryPage>
            },
            {
                path: "/search",
                element: <Search></Search>
            },
            {
                path: "/shop",
                element: <Shop></Shop>
            },
            {
                path: "/shop/:id",
                element: <SingleProduct></SingleProduct>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '*', // Catch-all route for undefined paths
        element: <NotFound />
    }
]);

export default router;