import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/HomePages/Home";
import MainLayout from "../Layouts/MainLayout"
import Registration from "../Auth/Registration/Registration";
// import Dashboard from "../components/adminDashboard/Dashboard";
import PrivateRoute from "../Router/PrivateRoute/PrivateRoute.jsx";
// import AdminRoute from "../Router/AdminRoute/AdminRoute";
import Wishlist from "../Pages/Wishlist/Wishlist";
import AddTocart from "../Pages/Wishlist/AddTocart";
import AllProducts from "../Pages/products/AllProducts/AllProducts";
import ProductsSection from "../Pages/products/ProductsSection";
import DashboardLayout from "../Layouts/DashboardLayout";
import AllUsers from "../Pages/adminDashboard/AllUsers";
import ProductAction from "../Pages/adminDashboard/ProductAction";
import AddProducts from "../Pages/adminDashboard/addProducts/AddProducts";
import Checkout from "../Pages/orderCheckout/Checkout";
import Login from "../Auth/login/Login";
import DashboardHome from "../Pages/adminDashboard/DashboardHom/DashboardHome";
import Offer from "../components/Shared/Offer";
import WaitingEmailVerification from "../Auth/WaitingEmailVerification";
import ResetPassword from "../Auth/ResetPassword";
import SecureRoute from "./SecureRoute";
import MyAccount from "../Pages/My account/MyAccount";
import ProductDetails from "../Pages/products/productDetails/ProductDetails";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentFail from "../Pages/Payment/PaymentFail";
import AdminRoute from "./AdminRoute/AdminRoute";


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
        path: '/categories/product/:id',
        element: <ProductDetails></ProductDetails>,
        loader:({params})=> fetch(`https://99-pro-shop-server.vercel.app/categories/product/${params.id}`)
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
        path: "/myAccount",
        element: <MyAccount></MyAccount>
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
       {
        path: "/payment/success",
        element: <PaymentSuccess></PaymentSuccess>
      },
       {
        path: "/payment/fail",
        element: <PaymentFail></PaymentFail>
      },
    ],
  },

   {
      path: '/dashboard',
      element: <PrivateRoute><AdminRoute><DashboardLayout></DashboardLayout></AdminRoute></PrivateRoute>, 
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
    },
    // {
    //   path: '/userProfile',
    //   element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>, 
    //   children: [
    //       {
    //         path: "/dashboard",
    //         element: <DashboardHome></DashboardHome>
    //       },
    //   ]
    // } 
    
 
  
]);

export default router;