import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePages/Home";
import MainLayout from "../Layouts/MainLayout"
import Registration from "../components/Shared/login/Registration";

// import Dashboard from "../components/adminDashboard/Dashboard";
import PrivateRoute from "../Router/PrivateRoute/PrivateRoute.jsx";
// import AdminRoute from "../Router/AdminRoute/AdminRoute";
import Wishlist from "../Pages/Wishlist/Wishlist";
import AddTocart from "../Pages/Wishlist/AddTocart";
import AllProducts from "../Pages/HomePages/products/AllProducts/AllProducts";
import ProductsSection from "../Pages/HomePages/products/ProductsSection";
import DashboardLayout from "../Layouts/DashboardLayout";
import AllUsers from "../components/adminDashboard/AllUsers";
import ProductAction from "../components/adminDashboard/ProductAction";
import AdminRoute from "./AdminRoute/AdminRoute";
import AddProducts from "../components/adminDashboard/addProducts/AddProducts";
import Checkout from "../Pages/orderCheckout/Checkout";
import Login from "../components/Shared/login/login/Login";
import DashboardHome from "../components/adminDashboard/DashboardHom/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: '/categories/:categoryId',
        element: <ProductsSection></ProductsSection>,
        loader:({params})=> fetch(`https://99-pro-server.vercel.app/categories/${params.categoryId}`)
     },
     {
        path: "/allProducts",
        element: <AllProducts></AllProducts>
      },
       {
        path: "/register",
        element: <Registration></Registration>
      },
        {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/wishlist",
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute> 
      },
      {
        path: "/cart",
        element: <PrivateRoute><AddTocart></AddTocart></PrivateRoute> 
      },
      {
        path: "/cart/order/:id",
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute> ,
        loader:({params})=> fetch(`https://99-pro-server.vercel.app/order/${params._id}`)
      },
    ],
  },

   {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>, 
      children: [
        {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>
        },
        {
          path: '/dashboard/users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
         {
          path: '/dashboard/addProducts',
          element: <AdminRoute><AddProducts></AddProducts></AdminRoute>
        },
         {
          path: '/dashboard/products',
          element: <PrivateRoute><ProductAction></ProductAction></PrivateRoute>
        },
       
        
      ]
    }
 
  
]);

export default router;