import { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";
import {  useNavigate } from "react-router-dom";


const ResetPassword = () => {
      const {resetPass } = useContext(AuthContext);
      const navigate = useNavigate()
  
  const handleRedirectClick = () => {
    // Redirect to the desired route 
     navigate('/login');
  }

	// handle submit
      const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value
        resetPass(email)
        .then(()=>{
          form.reset()
        })
        .catch((error)=>{
          toast.dismiss()
          form.reset()
          toast.error((error.message)  ,{duration:5000})
        })
      }
  
  
    return (
        <div className="overflow-hidden h-screen"
             style={{backgroundImage:`url("https://i.ibb.co/JFWNKMn/bg-min-1.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 
        <div className="flex justify-center items-center rounded mt-4">
          <div className="relative bg-white bg-opacity-75 rounded shadow-2xl lg:w-4/12 md:w-6/12 w-8/12 ">
            <div className="p-2 sm:p-7">
              <div className="text-center">
                <h1 className="block lg:text-2xl md:text-lg text-md font-bold text-pink-500">Forgot password?</h1>
                
              </div>

              <div className="mt-5">
                {/* Form */}
                <form onSubmit={(e)=>handleSubmit(e)}>
                  <div className="grid gap-y-4">
                    {/* reset input field */}
                    <div>
                      <label htmlFor="email" className="block lg: text-md text-sm mb-2 text-pink-500">Your Email address</label>
                      <div className="relative">
                        <input type="email" id="email" name="email" placeholder="Enter Your Email Here" className="flex justify-center  outline-none  w-full items-center lg:text-lg text-md rounded-lg lg:p-3 p-2 lg:text-md text-sm text-[#207198] bg-[#dbe9f6] border-pink-400 hover:border-sky-500 border-b placeholder:text-center   py-2 cursor-pointer" required aria-describedby="email-error"/>                    
                       </div>                     
                    </div>
                    {/* reset input field */}

                    <button type="submit" className="flex justify-center items-center lg:text-lg text-md rounded-lg lg:p-3 p-2 lg:text-md text-sm text-[#207198] bg-[#dbe9f6] border-pink-400 hover:border-sky-500 border-b  py-2 cursor-pointer">Reset password</button>
                  </div>
                </form>
                {/* End Form */}
               <div className="flex justify-center items-center  mt-2  lg:text-md md:text-sm text-xs font-semibold text-sky-600">
                <p className=" ">
                  Remember your password?
                </p>
       {/* redirect to login page */}
                  <p  onClick={handleRedirectClick} 
                    className="text-blue-600 underline ml-3 cursor-pointer">
                    Sign in here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
	</div>

    );
};

export default ResetPassword;