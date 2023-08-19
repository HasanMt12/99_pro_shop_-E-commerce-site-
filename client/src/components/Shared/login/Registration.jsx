// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
// import { AuthContext } from '../../../Authentication/AuthProvider';
// import { FcGoogle } from 'react-icons/fc';
// import useToken from '../../../hooks/useToken.js';
import SignupForm from './SignupForm';
const Registration = () => {
//       const {register, handleSubmit , formState: {errors} } = useForm();
//      const { signUp ,updateUser, signInWithGoogle}= useContext(AuthContext);
//      const [registerError, setRegisterError] = useState('')
//      const [createdUserEmail, setCreatedUserEmail] = useState('')
//      const navigate = useNavigate()
//        const [token] = useToken(createdUserEmail);
//      if(token){
//             navigate('/')
//         }
//      const handleSignUp = data =>{
//    setRegisterError('')

//     console.log(data);

//     signUp(data.email, data.password)

//     .then(result =>{
//         const  user = result.user;
//         console.log(user);
//         toast.success('user register successfully')
//             navigate('/')
//           const userInfo = {
//                 displayName: data.name
//             }

//         updateUser(userInfo)
//             .then( () => {
//                saveUser(data.name, data.email )
//             } )
//             .catch(error => console.log(error));
//     })
//     .catch(error=> {
//         console.log(error)
//        setRegisterError(error.message)
//     });
    
//  }
//        const saveUser = (name , email ) =>{
//             const user = {name , email };
//             fetch('https://99-pro-server.vercel.app/users', {
//                 method: 'POST' ,
//                 headers: {
//                     'content-type' : 'application/json'
//                 },
//                 body: JSON.stringify(user)
//             }).then(res => res.json())
//             .then(data =>{
//                 console.log('test',data);
//                 setCreatedUserEmail(email)  
//             })
//         }
//         const handleGoogleSignin = () => {
//     signInWithGoogle().then(result => {
//       console.log(result.user)
    
//     //   navigate(from, { replace: true })
//     })
//   }
    return (
        <>
        <div className="overflow-hidden h-screen"
      style={{backgroundImage:`url("/src/assets/bg.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12">
            <h2  data-aos="fade-up"className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl sm:leading-none">
              Fast Delivery At Your  <br className="hidden md:block" />
              Door-step!
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-700 md:text-lg">
            By  shopping with us, you will enjoy unmatched convenience and time savings. Imagine skipping the long checkout lines, avoiding crowded aisles, and shopping for groceries from the comfort of your own home.
            </p>
          
          </div>
          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="relative">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-400 lg:w-32 lg:-mr-16 sm:block"
              >
                <defs>
                  <pattern
                    id="766323e1-e594-4ffd-a688-e7275079d540"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#766323e1-e594-4ffd-a688-e7275079d540)"
                  width="52"
                  height="24"
                />
              </svg>
              <div data-aos="fade-left" className="relative bg-white bg-opacity-75 rounded shadow-2xl p-7 sm:p-10">
               <SignupForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
           
  
        </>
    );
};

export default Registration;