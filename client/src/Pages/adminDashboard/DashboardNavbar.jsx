import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
    const { user, logOut } = useContext(AuthContext);

   const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
 
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

                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem]  shadow-md rounded-lg p-2 bg-sky-200   border  border-gray-700" aria-labelledby="hs-dropdown-with-header">
                  <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg  ">
                    <p className="text-sm font-medium text-gray-800">{user?.email}</p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    {user?.uid ? (
                      <>
                        <button onClick={handleLogOut}
                          className="flex justify-center items-center gap-2 w-full text-pink-400  tracking-wide font-[Montserrat] bg-sky-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs font-medium transition hover:scale-105"
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