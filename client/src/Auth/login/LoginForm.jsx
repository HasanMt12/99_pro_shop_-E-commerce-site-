import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Context/AuthProvider';
import axios from 'axios';



const LoginForm = () => {

 const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [signInError, setSignInError] = useState("");
  const [signInUserEmail, setSignInUserEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate()
      if(loading){
          toast.wait('wait')
        }
 
 //login start here
 const handleLogin = (data) => {
     toast.loading('Please Wait!',{style: { color: '#00cbfe',  },})
     setSignInError("");
     signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSignInUserEmail(data.email);
        toast.dismiss()
        toast.success('login successful', {style: { color: '#00cbfe', },
            iconTheme: { primary: '#df81a5', secondary: '#FFFAEE', },
          },{duration:3000});
           reset();
           navigate(from, { replace: true });  navigate("/");
      })
      .catch((error) => {
        toast.dismiss();
        setSignInError(error.message);
        toast.error('user not register or user password is invalid', {
            style: {color: 'red',},
            iconTheme: { primary: '#df81a5',secondary: '#FFFAEE', }, });
          reset();
      });
  };    //login ends here

        //google login start
 const handleGoogleSignin = () => {
     toast.loading('Please Wait!',{style: { color: '#00cbfe',  },})
      signInWithGoogle()
      .then((result) => {
        if (result.user.uid) {
          const userInfo = {
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
            role: "visitor"
          };
          fetch("https://99-pro-shop-server.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then(() => {
                             //send jwt token
                if(result){
                axios.post('https://99-pro-shop-server.vercel.app/jwt')
                .then(data =>{
                    // console.log(data.data.token)
                    localStorage.setItem('access-token', data.data.token)
                    setLoading(false);
                })
            }
            else{ localStorage.removeItem('access-token')  }
            });
        }
          toast.dismiss()
          toast.success('login successful', {style: { color: '#00cbfe',},
            iconTheme: {  primary: '#df81a5', secondary: '#FFFAEE',   },
          },{duration:3000});
           navigate(from, { replace: true });
        })
          .catch((error) => {console.log(error.message);  });
     };
    return (
            <form onSubmit={handleSubmit(handleLogin)}  >
                   <div className="mb-1 sm:mb-2">
                    <label htmlFor="email" className="inline-block mb-1 text-[#2d90ba] font-medium" >
                      E-mail
                    </label>
                    <input
                      type="email" placeholder="your email"   id="email"
                      name="email"
                      className="flex-grow w-full h-10   px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      autoComplete="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
                      })}
                    />
                    {signInUserEmail && (
                      <span className="text-red-500 text-base mt-1">
                        Please enter a valid email address.
                      </span>
                    )}
                  </div>
                 <div className="mb-1 sm:mb-2">
                     <label htmlFor="password"className="inline-block mb-1 text-[#2d90ba] font-medium"
                          > Password
                     </label>
                     <input
                       type="password" placeholder="password"
                       id="password" name="password"
                       className="flex-grow w-full h-10   px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                       autoComplete="new-password"
                       {...register("password", { required: true, minLength: 6 })}
                     />
                      {errors.password && (
                        <span className="text-red-500 text-base mt-1">
                          Please enter a password.
                        </span>
                      )}
                  </div>
                   {/* sign in error show */}
                  <div>
                        {signInError && <p className='text-red-600'>{signInError}</p>}
                  </div>

                  <div className="mt-4 mb-1 sm:mb-2">
                    <button className="inline-flex items-center justify-center w-full h-10   px-6   text-[#2d90ba] font-semibold rounded shadow-md bg-[#e9b0c6] hover:bg-[#c68fa4] "
                       type="submit"> login
                    </button>
                   
                  </div>
       {/* redirect to forgot password section            */}
                  <p className=" text-start text-pink-400 text-sm">
                      forgot your password?{" "}
                        <Link to="/resetPass" className="text-blue-500 underline ml-1">
                          reset password
                        </Link>
                  </p>
      {/* redirect to register form */}
                   <p className="mt-4 text-center text-sky-500">
                      Do not have an account? Please, {" "}
                  <Link to="/register" className="text-blue-500 underline ml-1">
                    Register
                  </Link>
                 </p>
               <div  className="text-center text-md my-1 text-pink-400 font-semibold">OR</div>
      {/* google login start */}
              <div onClick={handleGoogleSignin} className="flex rounded-lg bg-[#dbe9f6] border-red-400 border-b justify-center items-center py-2 cursor-pointer">
                <button type="button"className=""  >
                  <FcGoogle className="text-lg mr-3" /> 
                </button>
                <p className='text-sm text-[#207198]'>Continue with google</p>
                </div> 
         </form>
    );
};

export default LoginForm;