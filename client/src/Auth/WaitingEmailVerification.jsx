import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { BiSmile } from 'react-icons/bi';
import { TbExternalLink } from 'react-icons/tb';


const WaitingEmailVerification = () => {
     const { user  } = useContext(AuthContext);
   
     // Refresh the page after 5 seconds
        useEffect(() => {
          const refreshTimeout = setTimeout(() => {
            window.location.reload();
          }, 10000); // Refresh every 5 seconds

          // Clean up the timeout when the component unmounts
          return () => clearTimeout(refreshTimeout);
        }, []);


    return (
       <div className="overflow-hidden h-screen"
        style={{backgroundImage:`url("https://i.ibb.co/pztsXFL/bg.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
          <div  className="flex justify-center items-cent rounded p-7 sm:p-3">
            <div className="relative bg-white bg-opacity-75 rounded shadow-2xl lg:px-[6rem] md:px-[4rem] px-[2rem] pt-2 pb-20" >
                <h2 className="text-pink-600 mb-4 lg:text-lg text-md ">Please verify your Email first </h2> 
                  {/* when user not verified */}
                 {user?.emailVerified === false  &&
                        <a href="https://mail.google.com/mail/u/1/#inbox/" target="blank"
                            className="flex justify-center items-center lg:text-lg text-md rounded-lg lg:p-3 p-2 lg:text-md text-sm text-[#207198] bg-[#dbe9f6] border-pink-400 hover:border-sky-500 border-b  py-2 cursor-pointer"
                        >Click here and check your Email <TbExternalLink></TbExternalLink></a>
                 }

                 {/* When User Verified */}
                 {user?.emailVerified === true && 
                     <Link className="flex justify-center items-center lg:text-lg text-md rounded-lg lg:p-3 p-2 lg:text-md text-sm text-[#207198] bg-[#dbe9f6] border-pink-400 hover:border-sky-500 border-b  py-2 cursor-pointer" to='/'>
                       <button className="text-sm text-[#207198] " >
                        Click here and happy shopping 
                        </button> <BiSmile className="text-pink-500"></BiSmile> 
                    </Link>
                  }
            </div>
          </div>
        </div>
      );
  };

export default WaitingEmailVerification;