import {  useContext, useEffect, useState } from "react";
 import logo from "../../assets/logo.jpg"
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { AiOutlineHeart, AiOutlineShoppingCart , AiOutlineLogout ,AiOutlineLogin } from "react-icons/ai";
import { BiSolidDashboard ,BiSolidUserAccount} from "react-icons/bi";
import useCart from "../../hooks/useCart";
import useVisitor from "../../hooks/useVIsitor";
import HeaderNavbar from "./HeaderNavbar";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isVisitor] = useVisitor(user?.email);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://99-pro-shop-server.vercel.app/wishlist?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [user?.email]);

  return (
    <>
      <HeaderNavbar></HeaderNavbar>
      <header className="bg-[#87ceeb]  bg-opacity-60 sticky top-0 z-10 shadow-md brightness-sm print:hidden lg:px-24 md:px-10 px-2">
        <div className=" mx-auto lg:py-2 md:py-2 py-1 flex items-center">
      
         <Link to="/"> 
          <div className="mr-auto md:w-48 flex-shrink-0">
            <img className="h-8 md:h-10 rounded-full" src={logo} alt="logo"/>
          </div>
          </Link>


          <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
            <span className="font-medium text-sky-600 md:text-md">+880 1602848424</span>
            <span className="font-semibold text-sm text-gray-400">Support 24/7</span>
          </div>


          <nav className="lg:ml-0 md:ml-0 ml-auto">
            <ul className="ml-4 xl:w-48 flex items-center justify-end">
            
              <li className="relative inline-block ml-3 lg:ml-4">
                <Link to="/wishlist">
                <AiOutlineHeart className="cursor-Pointer hover:text-sky-600  font-medium text-white lg:text-3xl md:text-2xl text-xl rounded-lg  "></AiOutlineHeart>
                  <div className="absolute -top-1 lg:-right-[12px] md:-right-[10px] -right-[8px] z-10 text-pink-400 rounded-full lg:text-sm md:text-xs text-xs font-semibold "> +{data?.length || "0"}</div>
                </Link>
              </li>
              <li className="ml-3 lg:ml-4  relative inline-block">
                <Link to="/cart">
                  <AiOutlineShoppingCart className="cursor-Pointer hover:text-sky-600  text-white font-medium lg:text-3xl md:text-2xl text-xl  "></AiOutlineShoppingCart>
                  <div className="absolute -top-1 lg:-right-[12px] md:-right-[10px] -right-[8px] z-10 text-pink-400 rounded-full lg:text-sm md:text-xs text-xs font-semibold "> +{cart?.length || "0"}</div>
                </Link>
              </li> 
              
              <li className="ml-4 lg:ml-6 relative inline-block">
                {user?.uid ? (
              <div className="hs-dropdown relative inline-flex ">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  text-gray-700 align-middle hover:bg-[#61a7c3] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs bg-[#86b0c1]  "
                >
                  <img
                    className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-sky-500  "
                    src={
                      user.photoURL
                        ? user.photoURL
                        : "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                    }
                    alt="Image Description"
                  />
                </button>

                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem]  shadow-md rounded-lg p-2 bg-sky-200   border  border-sky-500" aria-labelledby="hs-dropdown-with-header">
                  <div className="py-3 px-5 -m-2 bg-sky-50 rounded-t-lg  ">
                    <p className="text-sm font-medium  text-[#529ebb]">{user.email}</p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    {isVisitor ? (
                      <Link to="/user-account" className="flex justify-center items-center gap-2 w-full text-sky-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-sky-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs font-medium transition hover:scale-105 " href="">
                        <BiSolidUserAccount />
                        <span>My Account</span>
                      </Link>
                    ) : (
                      <Link to="/dashboard"> <div className="flex justify-center items-center gap-2 w-full text-sky-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-sky-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs font-medium transition hover:scale-105 " >
                        <BiSolidDashboard className="text-[#f0d9e2]"></BiSolidDashboard>
                        <span>My Dashboard</span>
                      </div>
                      </Link>
                    )}
                    <button
                      onClick={handleLogOut}
                      className="flex justify-center items-center gap-2 w-full text-pink-400  tracking-wide font-[Montserrat] bg-sky-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs font-medium transition hover:scale-105"
                    >
                      <AiOutlineLogout ></AiOutlineLogout>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login"><button
                    className="flex justify-center items-center my-2 gap-2 w-full text-pink-400 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs font-medium transition hover:scale-105 ">
                      <AiOutlineLogin></AiOutlineLogin>
                      Log in
                    </button></Link>
            )} 
              </li>
            </ul>
          </nav>


          {/* <div className="ml-4 hidden  font-bold">
            <span className="text-xs text-gray-400">Your Cart</span>
            <span>$2,650,59</span>
          </div> */}
        </div>
        
      </header>
    </>
  );
};

export default Navbar;
