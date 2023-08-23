
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../../Authentication/AuthProvider.jsx';
const SignupForm = () => {
      const {register, handleSubmit , formState: {errors} , getValues , reset } = useForm();
     const { signUp ,updateUser, signInWithGoogle}= useContext(AuthContext);
    const [registrationError, setRegisterError] = useState()
     const form = location.state?.form?.pathname || "/";
     const [createdUserEmail, setCreatedUserEmail] = useState('')
     const navigate = useNavigate()
      
        const from = location.state?.from?.pathname || "/";
     const handleSignUp = data =>{
   setRegisterError('')

    console.log(data);

    signUp(data.email, data.password)

    .then(result =>{
        const  user = result.user;
        console.log(user);
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
          toast.error('user already register or user id invalid', {
            style: {
              border: '1px solid #df81a5',
              padding: '10px',
              color: 'blue',
            },
            iconTheme: {
              primary: '#df81a5',
              secondary: '#FFFAEE',
            },
          });
          reset();
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
   toast.success('user register successfully', {
            style: {
              border: '1px solid #713200',
              padding: '10px',
              color: '#713200',
            },
            iconTheme: {
              primary: '#df81a5',
              secondary: '#FFFAEE',
            },
          });
           reset();
            navigate(form, { replace: true });
      navigate("/");
            })
               .catch((error) => {

        console.log(error.message);
       setRegisterError(error.message);
     
      });
        }
 

   const handleGoogleSignin = () => {
    signInWithGoogle()
      .then((result) => {
        if (result.user.uid) {
          toast.success("Login Successful");
          const userInfo = {
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
          };

          fetch("https://99-pro-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              // authorization: bearer ${localStorage.getItem('accessToken')}
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((result) => {
              
             console.log(result)
            });
        }
                  toast.success('google login successful', {
            style: {
              border: '1px solid #713200',
              padding: '10px',
              color: '#713200',
            },
            iconTheme: {
              primary: '#df81a5',
              secondary: '#FFFAEE',
            },
          });
           reset();
            navigate(form, { replace: true });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

 
    return (
        <form onSubmit = {
            handleSubmit(handleSignUp)
        } >
                  
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="name"
                      className="inline-block mb-1 text-[#2d90ba] font-medium"
                    >
                      Name
                    </label>
                     <input
                      type="text"
                      placeholder="your name"
                      id="name"
                      name="name"
                      className="flex-grow w-full h-10  px-4  mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
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
                      className="inline-block mb-1 text-[#2d90ba] font-medium"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="your email"
                      id="email"
                      name="email"
                      className="flex-grow w-full h-10  px-4  mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
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
                      className="inline-block mb-1 text-[#2d90ba] font-medium"
                     >
                            Password
                     </label>
                     <input
                       type="password"
                       placeholder="password"
                       id="password"
                       name="password"
                       className="flex-grow w-full h-10  px-4  mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
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
                      className="inline-block mb-1 text-[#2d90ba] font-medium"
                     >
                            confirm Password
                     </label>
                       <input
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="flex-grow w-full h-10  px-4  mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
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

                   

                  <div className="my-2">
                    <button className="inline-flex items-center justify-center w-full h-10 text-[#2d90ba] font-semibold rounded shadow-md bg-[#e9b0c6] hover:bg-[#c68fa4] "
                       type="submit"> Sign Up
                    </button>
                   
                  </div>
                   <p className="mt-3 text-center"> Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline ml-1">
                      Login </Link>
                  </p>
                <div  className="text-center text-md my-2 text-red-400 font-semibold">OR</div>
                <div onClick={handleGoogleSignin} className="flex rounded-lg bg-[#dbe9f6] border-red-400 border-b justify-center items-center py-2 cursor-pointer">
                <button type="button"className=""  >
                  <FcGoogle className="text-lg mr-3" /> 
                </button>
              <p className='text-sm text-[#207198]'>Continue with google</p>
              </div>
               
</form>
    );
};

export default SignupForm;