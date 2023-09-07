import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Context/AuthProvider';
import axios from 'axios';

const RegisterForm = () => {
  
    const { register, handleSubmit,getValues, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile ,signInWithGoogle , verifyEmail } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
        if(loading){
          toast.wait('wait')
        }
        const from = location.state?.from?.pathname || "/";
  const onSubmit = data => {
        toast.loading('Please Wait!',{
            style: {
              color: '#00cbfe',
            },})
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email , photoURL: data.photoURL, role: "visitor"}
                        fetch('https://99-pro-shop-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                              
                               verifyEmail()
                                if (data.insertedId  ) {
                                    toast.dismiss()
                                    reset();
                                    if(loggedUser.emailVerified === false){
                                      setLoading(true)
                                      navigate('/waitingVerification');
                                        }
                                        if(loggedUser.emailVerified === true){
                                       setLoading(false)
                                      navigate('/');
                                       
                                        toast.success('Please Verify your email', {
                                            style: {
                                              color: '#00cbfe',
                                            },
                                            iconTheme: {
                                              primary: '#df81a5',
                                              secondary: '#FFFAEE',
                                            },
                                          });
                                        }
                                  } 
                            })
                    })
                    .catch(error => console.log(error))
            })
    }; 
   
   
   const handleGoogleSignin = () => {
     toast.loading('Please Wait!',{
            style: {
              color: '#00cbfe',
            },})
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
              // authorization: bearer ${localStorage.getItem('accessToken')}
            
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then(() => {
               console.log(result)
                  if(result){
                axios.post('https://99-pro-shop-server.vercel.app/jwt')
                .then(data =>{
                    // console.log(data.data.token)
                    localStorage.setItem('access-token', data.data.token)
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token')
            }

            });
        }
            toast.dismiss()
            toast.success('User Register successful', { style: { color: '#00cbfe',},
            iconTheme: {
              primary: '#df81a5',
              secondary: '#FFFAEE',
            },
          },
          {duration:3000});
           reset();
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error.message);
          });
      };

 
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
                  
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
                     <label htmlFor="password"
                      className="inline-block mb-1 text-[#2d90ba] font-medium"
                     > Password
                     </label>
                     <input
                       type="password"
                       placeholder="password"
                       id="password"
                       name="password"
                       className="flex-grow w-full h-10  px-4  mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                       autoComplete="new-password"
                       {...register("password",  {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}  />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                  </div>

                  <div className="mb-1 sm:mb-2">
                     <label
                      htmlFor="confirmPassword"
                      className="inline-block mb-1 text-[#2d90ba] font-medium"
                     > confirm Password</label>
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
              {/*submit <button*/}
                  <div className="my-2">
                    <button className="inline-flex items-center justify-center w-full h-10 text-[#2d90ba] font-semibold rounded shadow-md bg-[#e9b0c6] hover:bg-[#c68fa4] "
                       type="submit"> Sign Up
                    </button>
                   
                  </div>
                   <p className="mt-3 text-center text-sky-500"> Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline ml-1">
                      Login </Link>
                  </p>
                <div  className="text-center text-md my-1 text-pink-400 font-semibold">OR</div>
                <div onClick={handleGoogleSignin} className="flex rounded-lg bg-[#dbe9f6] border-red-400 border-b justify-center items-center py-2 cursor-pointer">
                <button type="button"className=""  >
                  <FcGoogle className="text-lg mr-3" /> 
                </button>
              <p className='text-sm text-[#207198]'>Continue with google</p>
              </div>
               
</form>
    );
};

export default RegisterForm;