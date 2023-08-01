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
        path: "/wishlist",
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute> 
      },
      {
        path: "/cart",
        element: <PrivateRoute><AddTocart></AddTocart></PrivateRoute> 
      },
      //  {
      //   path: "/products",
      //   element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute> 
      // },
    ],
  },

   {
      path: 'dashboard',
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>, 
      children: [
        {
          path: '/dashboard/users',
          element: <AllUsers></AllUsers>
        },
         {
          path: '/dashboard/products',
          element: <ProductAction></ProductAction>
        },
        
      ]
    }
 
  
]);

export default router;