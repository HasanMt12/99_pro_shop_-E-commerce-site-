import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePages/Home";
import MainLayout from "../Layouts/MainLayout"
import Registration from "../Auth/Registration/Registration";
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

import AddProducts from "../components/adminDashboard/addProducts/AddProducts";
import Checkout from "../Pages/orderCheckout/Checkout";
import Login from "../Auth/login/Login";
import DashboardHome from "../components/adminDashboard/DashboardHom/DashboardHome";
import Offer from "../components/Shared/Offer";
import WaitingEmailVerification from "../Auth/WaitingEmailVerification";
import ResetPassword from "../Auth/ResetPassword";
import SecureRoute from "./SecureRoute";


const router = createBrowserRouter([
  {
    path:'*',
    element: <MainLayout></MainLayout>,
  },
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
        loader:({params})=> fetch(`https://99-pro-shop-server.vercel.app/categories/${params.categoryId}`)
     },
     {
        path: "/allProducts",
        element: <AllProducts></AllProducts>
      },
       {
        path: "/register",
        element: <SecureRoute><Registration></Registration></SecureRoute>
      },
      {
        path: "/login",
        element: <SecureRoute><Login></Login></SecureRoute>
      },
      {
        path: "/waitingVerification",
        element: <WaitingEmailVerification></WaitingEmailVerification>
      },
      {
        path: "/resetPass",
        element: <ResetPassword></ResetPassword>
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
        loader:({params})=> fetch(`https://99-pro-shop-server.vercel.app/order/${params._id}`)
      },
       {
        path: "/offer",
        element: <Offer></Offer> 
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
          element: <AllUsers></AllUsers>
        },
         {
          path: '/dashboard/addProducts',
          element:<AddProducts></AddProducts>,
        },
         {
          path: '/dashboard/products',
          element: <ProductAction></ProductAction>
        },
       
        
      ]
    }
 
  
]);

export default router;