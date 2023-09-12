import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const MyAccount = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
    };

    return (
        <div className="lg:hidden block">
            <div className="flex justify-between items-center bg-[#f58cb9f9] bg-opacity-60 py-3 px-3 ">
                <div>
                    <Link to="/"><button
                     style={{ boxShadow: "0px 10px 13px -7px #AEB1B0, 5px 5px 15px 5px rgba(0,0,0,0)", }}
                        className="flex items-center gap-x-2 my-2 ml-3 transition duration-200 ease-in-out transform px-3 py-[2px] text-[#EEF2F5] w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#d16c93]  via-[#fa669f] to-[#e2a1ba]  rounded-lg hover:translate-y-px sm:border-l s "
                    >  Back to Home
                     </button></Link>
                </div>
                <div>
                   {user?.uid ? (
                                    <div className="hs-dropdown lg:hidden  n   relative inline-flex [--placement:bottom-right]">
                            <button id="hs-dropdown-with-header" type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  text-gray-700 align-middle hover:bg-[#61a7c3] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs bg-[#86b0c1]  hover:bg-[#498096] text-white  hover:text-white   ">
                            <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-sky-500  " 
                            src={user.photoURL?user.photoURL : "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"} alt="Image Description"/>
                            </button>
                            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem]  shadow-md rounded-lg p-2 bg-[#529ebb]   border  border-sky-500" aria-labelledby="hs-dropdown-with-header">
                            <div className="py-3 px-5 -m-2 bg-sky-50 rounded-t-lg  ">
                                <p className="text-sm font-medium  text-[#529ebb]">{user.email}</p>
                            </div>
                            <div className="mt-2 py-2 first:pt-0 last:pb-0">
                                <button  onClick={handleLogOut}
                                style={{ boxShadow: "0px 10px 13px -7px #AEB1B0, 5px 5px 15px 5px rgba(0,0,0,0)", }}
                                    className="flex items-center gap-x-2 my-2 ml-3 transition duration-200 ease-in-out transform px-3 py-[2px] text-[#EEF2F5] w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#d16c93]  via-[#fa669f] to-[#e2a1ba]  rounded-lg hover:translate-y-px sm:border-l s "
                                >  log out
                                </button>
                            </div>
                            </div>
                        </div>
                   )
                   :
                   (
                    <Link to="/login"><button
                        style={{ boxShadow: "0px 10px 13px -7px #AEB1B0, 5px 5px 15px 5px rgba(0,0,0,0)", }}
                        className="flex items-center gap-x-2 transition duration-200 ease-in-out transform px-3 py-1 text-[#EEF2F5] w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#d16c93]  via-[#fa669f] to-[#e2a1ba]  rounded-lg hover:translate-y-px sm:border-l s ">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg> Log in
                        </button></Link>
                   )}
            
           
      

                </div>
            </div>
     
        </div>
  
    );
};

export default MyAccount;