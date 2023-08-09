
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { FcGoogle } from 'react-icons/fc';
import useToken from '../../../hooks/useToken';
import { AuthContext } from '../../../Authentication/AuthProvider.jsx';
const SignupForm = () => {
      const {register, handleSubmit , formState: {errors} , getValues } = useForm();
     const { signUp ,updateUser, signInWithGoogle}= useContext(AuthContext);
     const [registerError, setRegisterError] = useState('')
     const [createdUserEmail, setCreatedUserEmail] = useState('')
     const navigate = useNavigate()
       const [token] = useToken(createdUserEmail);
     if(token){
            navigate('/')
        }
        const from = location.state?.from?.pathname || "/";
     const handleSignUp = data =>{
   setRegisterError('')

    console.log(data);

    signUp(data.email, data.password)

    .then(result =>{
        const  user = result.user;
        console.log(user);
        toast.success('user register successfully')
            navigate('/')
          const userInfo = {
                displayName: data.name
            }

        updateUser(userInfo)
            .then( () => {
               saveUser(data.name, data.email )
            } )
            .catch(error => console.log(error));
    })
    .catch(error=> {
        console.log(error)
       setRegisterError(error.message)
    });
    
 }
       const saveUser = (name , email ) =>{
            const user = {name , email };
            fetch('https://99-pro-server.vercel.app/users', {
                method: 'POST' ,
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => res.json())
            .then(data =>{
                console.log('test',data);
                setCreatedUserEmail(email)  
            })
        }
        
//       const handleGoogleSignin = async () => {
//   const toastId = toast.loading("Loading...");
//    try {
//         signInWithGoogle().then(result => {
//       console.log(result.user)
//      toast.dismiss(toastId);
//         toast.success("User signed in successfully");
//     //   navigate(from, { replace: true })
//     })
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.error(error.message || "User not signed in");
//     }
//   };
     const handleGoogleSignin = () => {
    signInWithGoogle().then(result => {
      console.log(result.user)
    
    navigate(from, { replace: true })
    })
  }
 
    return (
        <form onSubmit = {
            handleSubmit(handleSignUp)
        } >
                  
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="name"
                      className="inline-block mb-1 font-medium"
                    >
                      Name
                    </label>
                     <input
                      type="text"
                      placeholder="name"
                      id="name"
                      name="name"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-base mt-1">
                        Please enter your name.
                      </span>
                    )}
                  
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className="inline-block mb-1 font-medium"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      id="email"
                      name="email"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      autoComplete="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-base mt-1">
                        Please enter a valid email address.
                      </span>
                    )}
                  </div>
                 <div className="mb-1 sm:mb-2">
                     <label
                      htmlFor="password"
                      className="inline-block mb-1 font-medium"
                     >
                            Password
                     </label>
                     <input
                       type="password"
                       placeholder="password"
                       id="password"
                       name="password"
                       className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                       autoComplete="new-password"
                       {...register("password", { required: true, minLength: 6 })}
                     />
                      {errors.password && (
                        <span className="text-red-500 text-base mt-1">
                          Please enter a password.
                        </span>
                      )}
                  </div>

                  <div className="mb-1 sm:mb-2">
                     <label
                      htmlFor="confirmPassword"
                      className="inline-block mb-1 font-medium"
                     >
                            confirm Password
                     </label>
                       <input
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        autoComplete="new-password"
                        {...register("confirmPassword", {
                          required: true,
                          minLength: 6,
                          validate: (value) =>
                            value === getValues("password") || "The passwords do not match.",
                        })}
                      />
                      {errors.confirmPassword && (
                        <span className="text-red-500 text-base mt-1">
                          {errors.confirmPassword.message || "Please confirm your password."}
                        </span>
                      )}
                     
                  </div>

                   

                  <div className="mt-4 mb-2 sm:mb-4">
                    <button className = "inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                       type="submit"> Sign Up
                    </button>
                   
                  </div>
                   <p className="mt-3">
        Already have an account?{" "}
        <Link className="text-blue-500 underline ml-1" href="/login">
          Login
        </Link>
      </p>
      <div className="divider mt-5">OR</div>
                 <div className="flex justify-center items-center cursor-pointer">
    <button
      onClick={handleGoogleSignin}
      type="button"
      className=""
    >
      <FcGoogle className="text-3xl mr-3" /> 
    </button>
    <p>Continue with google</p>
    </div>
               
                </form>
    );
};

export default SignupForm;