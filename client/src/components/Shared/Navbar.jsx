/* eslint-disable react/no-unknown-property */
import { Fragment, useContext, useEffect, useState } from "react";
import logo from "../../assets/y.jpg"
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { AiOutlineHeart, AiOutlineShoppingCart , AiOutlineLogout ,AiOutlineLogin } from "react-icons/ai";
import { BiSolidDashboard ,BiSolidUserAccount} from "react-icons/bi";
import { HiMenuAlt1 } from "react-icons/hi";
import useCart from "../../hooks/useCart";
import useVisitor from "../../hooks/useVIsitor";


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

  // Navbar menus are defined below
  const menuItems = (
    <Fragment>
      <Link to="/">
        <li className="cursor-Pointer text-white text-[1.1rem] font-medium  hover:text-sky-400">
          Shopping
        </li>
      </Link>

      <span className="relative inline-block ml-4">
        <Link to="/cart">
          {" "}
          <AiOutlineShoppingCart className="cursor-Pointer   text-white font-semibold text-3xl  "></AiOutlineShoppingCart>

          <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 animate-bounce font-bold text-[#333333] -translate-y-1/1  rounded-full">
            +{cart?.length || "0"}
          </span>{" "}
        </Link>
      </span>

      <span className="relative inline-block ml-4">
        <Link to="/wishlist">
          {" "}
          <AiOutlineHeart className="cursor-Pointer  font-semibold text-white text-3xl rounded-lg  "></AiOutlineHeart>

          <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 animate-bounce font-bold text-[#333333]  -translate-y-1/1  rounded-full">
            {data.length}
          </span>{" "}
        </Link>
      </span>

       {user?.uid ? (
        <div className="hs-dropdown lg:block hidden relative inline-flex [--placement:bottom-right]">
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
                <a className="flex justify-center items-center gap-2 w-full text-sky-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-sky-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-[10px] font-medium transition hover:scale-105 " href="">
                  <BiSolidUserAccount />
                  <span>My Account</span>
                </a>
              ) : (
                <a className="flex justify-center items-center gap-2 w-full text-sky-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-sky-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-[10px] font-medium transition hover:scale-105 " href="#">
                  <BiSolidDashboard className="text-[#f0d9e2]"></BiSolidDashboard>
                  <span>My Dashboard</span>
                </a>
              )}
              <button
                onClick={handleLogOut}
                className="flex justify-center items-center gap-2 w-full text-pink-500  tracking-wide font-[Montserrat] bg-sky-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-[10px] font-medium transition hover:scale-105"
              >
                <AiOutlineLogout ></AiOutlineLogout>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
         <Link to="/login"><button
              className="flex justify-center items-center my-2 gap-2 w-full text-pink-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-[10px] font-medium transition hover:scale-105 ">
                <AiOutlineLogin></AiOutlineLogin>
                Log in
              </button></Link>
      )} 
    </Fragment>
  );
 const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>

<header class="bg-[#87ceeb]  bg-opacity-60 sticky top-0 z-10 print:hidden">
  <div class="mx-auto px-4 sm:px-6 lg:px-[8rem]">
    <div class="flex lg:h-14 h-[2.6rem] items-center justify-between">
      <div class="flex-1 md:flex md:items-center md:gap-12">
         <a href="/"  className="inline-flex items-center -mb-2"  >
                <div className="flex items-center justify-center overflow-hidden  rounded-full">
                  <img className="h-[1.8rem] w-[1.8rem] lg:h-[2.2rem] lg:w-[2.2rem] rounded-full" src={logo} />
                </div>
          </a>
      </div>

      <div class="md:flex md:items-center md:gap-12">
        <nav aria-label="Global" class="hidden md:block">
          <ul class="flex items-center gap-6 text-sm">
            {menuItems}
          </ul>
        </nav>

        <div class="flex items-center gap-2  lg:hidden">
        
          <div class="flex md:hidden">
          <div>
             {user?.uid? (
             <div className="hs-dropdown relative inline-flex [--placement:bottom-right] my-auto">
            <button id="hs-dropdown-with-header" type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-[1.6rem] w-[1.6rem] rounded-full font-medium    align-middle hover:bg-[#61a7c3]  transition-all text-xs my-auto bg-[#86b0c1]">
              <img className="inline-block h-[1.4rem] w-[1.4rem] rounded-full " 
              src={user.photoURL?user.photoURL : "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"} alt="Image Description"/>
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[10rem]  shadow-md rounded-lg p-2 bg-sky-200 z-30  border  border-sky-500" aria-labelledby="hs-dropdown-with-header">
              <div className="py-2 px-4 -m-2 bg-sky-50 rounded-t-lg  ">
                <p className="text-sm font-medium  text-[#529ebb]">{user.email}</p>
              </div>
              <div className="mt-2 py-2 first:pt-0 last:pb-0">
               {
               isVisitor ?  <a className="flex justify-center items-center gap-2 w-full text-sky-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-sky-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-[10px] py-1 font-medium transition hover:scale-105  " href="#">
                 <BiSolidUserAccount />
                  My account
                </a>: 
                 <a className="flex justify-center items-center gap-2 w-full text-sky-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-sky-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-[10px] font-medium py-1 transition hover:scale-105 " href="#">
                  <BiSolidDashboard className="text-[#f0d9e2]"></BiSolidDashboard>
                  <span>My Dashboard</span>
                </a>
                    }
               <button
                onClick={handleLogOut}
                className="flex justify-center py-1 items-center gap-2 w-full text-pink-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-[10px] font-medium transition hover:scale-105 "
              >
                <AiOutlineLogout className="text-[#f0d9e2]"></AiOutlineLogout>
                <span>Log Out</span>
              </button>
              </div>
            </div>
          </div>):(
              <>
            <Link to="/login"><button
              className="flex justify-center items-center my-2 gap-2 w-full text-pink-500 mb-2 tracking-wide font-[Montserrat] bg-sky-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-[10px] font-medium transition hover:scale-105  ">
                <AiOutlineLogin></AiOutlineLogin>
                Log in
              </button></Link>
           </>
          )}
          </div>
          </div>
          <div class="block md:hidden">
            <button  onClick={() => setIsMenuOpen(true)}
              class="rounded bg-[#87ceeb]/90 p-1 text-pink-400/90 transition hover:text-pink-600/75"
            >
             <HiMenuAlt1></HiMenuAlt1>
            </button>
              {isMenuOpen && (
            <div class="absolute top-0 left-0 w-full z-40">
              <div class="p-5 bg-[#87ceeb] border rounded shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <div>
                     <a href="/"  className="inline-flex items-center"  >
                          <div className="flex items-center justify-center overflow-hidden rounded-full">
                            <img className="h-[1.8rem] w-[1.8rem] lg:h-[2.2rem] lg:w-[2.2rem] rounded-full" src={logo} />
                          </div>
                    </a>
                  </div>
                  <div>
                    <button
                      class="p-1 -mt-2 -mr-2 transition duration-200 rounded focus:bg-gray-200 focus:outline-none focus:shadow-outline "
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg class="w-4 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul class="space-y-4">
                      
                    <li>
                      <Link to="/"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Home
                      </Link>
                    </li>
                    {isVisitor?(
                    <li>
                      <a
                        href="/myAccount"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        My Account
                      </a>
                    </li>
                    ):(
                      <li>
                      <a
                        href="/dashboard"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Dashboard
                      </a>
                    </li>
                    )
                    }
                    <span className="relative inline-block mr-4">
                      <Link to="/cart">
                        {" "}
                        <AiOutlineShoppingCart className="cursor-Pointer  text-white font-semibold text-2xl  "></AiOutlineShoppingCart>
                      
                        <span className="absolute top-0 right-0 inline-block text-xs transform translate-x-1/2 animate-bounce font-semibold text-[#333333]/90 -translate-y-1/1  rounded-full">
                        {cart?.length || "0"}
                        </span> </Link>
                      </span>
                   <span className="relative inline-block ">
                      <Link to="/wishlist">
                        {" "}
                        <AiOutlineHeart className="cursor-Pointer  font-semibold text-white text-2xl rounded-lg  "></AiOutlineHeart>
                    
                      <span className="absolute top-0 right-0 inline-block text-xs transform translate-x-1/2 animate-bounce font-bold text-[#333333]  -translate-y-1/1  rounded-full">
                        {data.length}
                      </span> </Link>
                    </span>
                  
                  </ul>
                </nav>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

    </>
  );
};

export default Navbar;
