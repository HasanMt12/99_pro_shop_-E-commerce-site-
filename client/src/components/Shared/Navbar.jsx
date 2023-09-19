import { Fragment, useContext, useEffect, useState } from "react";
import logo from "../../assets/y.jpg"
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import useCart from "../../hooks/useCart";
import useVisitor from "../../hooks/useVIsitor";




const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
   const [isVisitor] = useVisitor(user?.email)

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };


  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://99-pro-shop-server.vercel.app/wishlist?email=${user?.email}`  )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [user?.email]);

  // Navbar menus is here
  const menuItems = (
    <Fragment>
      <Link to="/">
        <li className="cursor-Pointer text-white  font-medium  hover:text-sky-400">Shopping</li>
      </Link> 

      <span className="relative inline-block ml-6">
        <Link to="/cart">
          {" "}
          <AiOutlineShoppingCart className="cursor-Pointer   text-white font-semibold text-3xl  "></AiOutlineShoppingCart>
        </Link>
        <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 animate-bounce font-bold text-[#82C1DA] -translate-y-1/1  rounded-full">
         +{cart?.length || 0}
        </span>
      </span>

      <span className="relative inline-block ml-6">
        <Link to="/wishlist">
          {" "}
          <AiOutlineHeart className="cursor-Pointer  font-semibold text-white text-3xl rounded-lg  "></AiOutlineHeart>
        </Link>
        <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 animate-bounce font-bold text-[#82C1DA] -translate-y-1/1  rounded-full">
          {data.length}
        </span>
      </span>

      {user?.uid? (<div className="hs-dropdown lg:block hidden relative inline-flex [--placement:bottom-right]">
            <button id="hs-dropdown-with-header" type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  text-gray-700 align-middle hover:bg-[#61a7c3] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs bg-[#86b0c1]  hover:bg-[#498096] text-white  hover:text-white   ">
              <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-sky-500  " 
              src={user.photoURL?user.photoURL : "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"} alt="Image Description"/>
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem]  shadow-md rounded-lg p-2 bg-[#529ebb]   border  border-sky-500" aria-labelledby="hs-dropdown-with-header">
              <div className="py-3 px-5 -m-2 bg-sky-50 rounded-t-lg  ">
                <p className="text-sm font-medium  text-[#529ebb]">{user.email}</p>
              </div>
              <div className="mt-2 py-2 first:pt-0 last:pb-0">
               {
        isVisitor ?  <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm   text-white  hover:bg-[#61b2d2] " href="#">
                  <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                  </svg>
                  My account
                </a>: <Link to='/dashboard'  className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm  text-white  hover:bg-[#61b2d2] ">
                  <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                 Dashboard
                </Link>
       }
               
                
              
                  <button  onClick={handleLogOut}
                  style={{ boxShadow: "0px 10px 13px -7px #AEB1B0, 5px 5px 15px 5px rgba(0,0,0,0)", }}
                    className="flex items-center gap-x-2 my-2 ml-3 transition duration-200 ease-in-out transform px-3 py-[2px] text-[#EEF2F5] w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#d16c93]  via-[#fa669f] to-[#e2a1ba]  rounded-lg hover:translate-y-px sm:border-l s "
                  >  log out
                </button>
              </div>
            </div>
          </div>):(
              <>
            <Link to="/login"><button
              style={{ boxShadow: "0px 10px 13px -7px #AEB1B0, 5px 5px 15px 5px rgba(0,0,0,0)", }}
              className="flex items-center gap-x-2 transition duration-200 ease-in-out transform px-3 py-1 text-[#EEF2F5] w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#d16c93]  via-[#fa669f] to-[#e2a1ba]  rounded-lg hover:translate-y-px sm:border-l s ">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                Log in
              </button></Link>
           </>
          )}
          
    
    </Fragment>
  );


  return (
    <>
 {/* large device navbar is here*/}
      <div className="sticky top-0 z-10 lg:block hidden print:hidden">
        <div className = "bg-[#f58cb9f9] bg-opacity-60" >
          <div className=" py-2 mx-auto px-[8rem] ">
            <div className="relative flex items-center  justify-between ">
              <a href="/"  className="inline-flex items-center"  >
                <div className="flex w-[7%]  items-center justify-center lg:w-10 lg:h-10 sm:h-8 sm:w-8   overflow-hidden rounded-full">
                  <img src={logo} />
                </div>
              </a>
              <ul className="text-black cursor-pointer text-lg items-center hidden space-x-8 lg:flex">
                {menuItems}
              </ul>
            </div>
          </div>
        </div>
      </div>

{/* tab and mobil device navbar is here */}
    <div className="lg:hidden block fixed bottom-0 left-0 z-50 w-full h-14 bg-[#529ebb]  border-t border-gray-200 print:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#61a7c3]  group">
            <BiHome className="cursor-Pointer text-white font-semibold text-[1.2rem] "></BiHome>
            <Link to="/" > <span className="text-xs text-white  group-hover:text-sky-50 ">Home</span></Link>
          </div>
          <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#61a7c3]  group">
            <AiOutlineShoppingCart className="cursor-Pointer text-white font-semibold text-[1.2rem] "></AiOutlineShoppingCart>
            <Link to="/cart"><span className="text-xs text-white  group-hover:text-sky-50 ">Cart</span></Link>
          </div>
          <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#61a7c3]  group">
            <IoIosHeartEmpty className="cursor-Pointer font-semibold mb-1 text-white text-[1.2rem] "></IoIosHeartEmpty>
              <span className="text-xs text-white  group-hover:text-sky-50 ">Wish list</span>
          </div>
          <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#61a7c3]  group">
            <BsPersonCircle className="cursor-Pointer font-semibold text-white text-[1.2rem] "></BsPersonCircle>
            <Link to="/"> <span className="text-xs text-white  group-hover:text-sky-50 ">Profile</span></Link>
          </div>
      </div>
   </div>
    </>
  );
};

export default Navbar;
