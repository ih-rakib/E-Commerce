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

const PlaceholderPage = ({ title, message }) => (
    <div className="section__container text-center">
        <h2 className="section__header">{title}</h2>
        <p className="section__subheader">{message || "This section is coming soon."}</p>
    </div>
);

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
            },
            // Placeholder routes for links referenced in the navbar dropdowns.
            // Replace with real dashboards when implemented.
            {
                path: "/dashboard",
                element: <PlaceholderPage title="User Dashboard" message="Your orders, payments and profile will appear here." />
            },
            {
                path: "/dashboard/profile",
                element: <PlaceholderPage title="Profile" />
            },
            {
                path: "/dashboard/payments",
                element: <PlaceholderPage title="Payments" />
            },
            {
                path: "/dashboard/orders",
                element: <PlaceholderPage title="Orders" />
            },
            {
                path: "/dashboard/admin",
                element: <PlaceholderPage title="Admin Dashboard" />
            },
            {
                path: "/dashboard/manage-products",
                element: <PlaceholderPage title="Manage Products" />
            },
            {
                path: "/dashboard/manage-orders",
                element: <PlaceholderPage title="Manage Orders" />
            },
            {
                path: "/dashboard/add-new-post",
                element: <PlaceholderPage title="Add New Product" />
            },
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
