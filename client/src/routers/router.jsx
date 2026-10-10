import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/categories/CategoryPage";
import Search from "../pages/search/Search";
import Shop from "../pages/shop/Shop";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import NotFound from "../pages/error/NotFound";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDashboardMain from "../pages/dashboard/user/dashboard/UserDashboardMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminMain from "../pages/dashboard/admin/dashboard/AdminMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProducts from "../pages/dashboard/admin/manageProducts/ManageProducts";
import UpdateProduct from "../pages/dashboard/admin/manageProducts/UpdateProduct";
import ManageUsers from "../pages/dashboard/admin/users/ManageUsers";
import ManageOrders from "../pages/dashboard/admin/orders/ManageOrders";
import Contact from "../pages/contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct></SingleProduct>,
      },
      {
        path: "/success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails></OrderDetails>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <NotFound />,
  },

  // dashboard routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // user routes
      { path: "", element: <UserDashboardMain></UserDashboardMain> },
      { path: "orders", element: <UserOrders></UserOrders> },
      { path: "payments", element: <UserPayments></UserPayments> },
      { path: "profile", element: <UserProfile></UserProfile> },
      { path: "reviews", element: <UserReviews></UserReviews> },

      // admin routes(private for admin)
      {
        path: "admin",
        element: (
          <PrivateRoute role="admin">
            <AdminMain></AdminMain>
          </PrivateRoute>
        ),
      },
      {
        path: "add-new-product",
        element: (
          <PrivateRoute role="admin">
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role="admin">
            <ManageProducts></ManageProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute role="admin">
            <UpdateProduct></UpdateProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute role="admin">
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute role="admin">
            <ManageOrders></ManageOrders>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
