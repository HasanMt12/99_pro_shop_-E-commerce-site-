import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
    const { user, logOut } = useContext(AuthContext);

   const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navigate = useNavigate();
    return (
        <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8" aria-label="Global">
      <div className="mr-5 lg:mr-0 lg:hidden">
      <Link to="/"className="flex-none text-xl font-semibold  text-white">Home</Link>  
      </div>

      <div className="w-full flex items-center md:justify-end sm:justify-between ml-auto lg:justify-between sm:gap-x-3 sm:order-3">
       
       <Link to="/" className="text-white lg:block hidden font-semibold text-lg">
        Home
       </Link>
        
        <div className="flex flex-row items-center justify-end gap-2">

          <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
            <button id="hs-dropdown-with-header" type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs bg-[#86b0c1]  hover:bg-[#498096] text-white  hover:text-white   ">
             <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white  " 
              
              src={user.photoURL?user.photoURL : "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"} alt="Image Description"/>
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem]  shadow-md rounded-lg p-2 bg-[#6189a2]   border  border-gray-700" aria-labelledby="hs-dropdown-with-header">
              <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg  ">
                <p className="text-sm font-medium text-gray-800">{user?.email}</p>
              </div>
              <div className="mt-2 py-2 first:pt-0 last:pb-0">
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500  text-white  hover:bg-gray-700  hover:text-gray-300" href="#">
                  <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                  </svg>
                  Newsletter
                </a>
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500  text-white  hover:bg-gray-700  hover:text-gray-300" href="#">
                  <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path  d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"/>
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                  </svg>
                  Downloads
                </a>
                {user?.uid ? (
        <>
          <button onClick={handleLogOut}
            style={{
              boxShadow:
                "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
            }}
            className="flex text-[#EEF2F5] my-2 justify-center transition duration-200 ease-in-out transform px-5 py-1 w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#cc5a86]  via-[#EA0F62] to-[#e2a1ba] rounded-2xl hover:translate-y-px "
          >
         log out
          </button>
        </>
      ) : ""}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    );
};

export default DashboardNavbar;