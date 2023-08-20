import { Fragment, useContext, useEffect, useState } from "react";
import logo from "../../assets/y.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import loginPhoto from "/y.jpg";
import "./navbar.css";
import { AuthContext } from "../../Authentication/AuthProvider";
import { useForm } from "react-hook-form";
import useAdmin from "../../hooks/useAdminSecurity";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import logo99 from "../../assets/logo99.png";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
   const [cart] = useCart();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [signInError, setSignInError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [signInUserEmail, setSignInUserEmail] = useState("");
  const form = location.state?.form?.pathname || "/";

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `https://99-pro-server.vercel.app/wishlist?email=${user?.email}&&limit=3`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
     
  }, [user?.email]);

  const menuItems = (
    <Fragment>
      <Link to="/">
        <li className="cursor-Pointer nav hover:text-[#F10B65]">Home</li>
      </Link>
      {isAdmin && (
        <Link to="/dashboard">
          <li className="cursor-Pointer nav hover:text-[#F10B65]">Dashboard</li>
        </Link>
      )}
      <span className="relative inline-block ml-8">
        <Link to="/cart">
          {" "}
          <AiOutlineShoppingCart className="cursor-Pointer   text-white font-bold text-4xl  "></AiOutlineShoppingCart>
        </Link>
        <span className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1/2 animate-bounce font-bold text-blue-400 -translate-y-1/2  rounded-full">
         +{cart?.length || 0}
        </span>
      </span>

      <span className="relative inline-block ml-8">
        <Link to="/wishlist">
          {" "}
          <AiOutlineHeart className="cursor-Pointer   text-white text-4xl rounded-lg  "></AiOutlineHeart>
        </Link>
        <span className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1/2 animate-bounce font-bold text-blue-400 -translate-y-1/2  rounded-full">
          {data.length}
        </span>
      </span>

      {user?.uid? (<div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
            <button id="hs-dropdown-with-header" type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs bg-[#86b0c1]  hover:bg-[#498096] text-white  hover:text-white   ">
             
              <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white  " 
              
              src={user.photoURL?user.photoURL : "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"} alt="Image Description"/>
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem]  shadow-md rounded-lg p-2 bg-[#6189a2]   border  border-gray-700" aria-labelledby="hs-dropdown-with-header">
              <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg  ">
                <p className="text-sm font-medium text-gray-800  text-gray-300">{user.email}</p>
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
                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                  Purchases
                </a>
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500  text-white  hover:bg-gray-700  hover:text-gray-300" href="#">
                  <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path  d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"/>
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                  </svg>
                  Downloads
                </a>
   
      
          <button
            style={{
              boxShadow:
                "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
            }}
            className="flex text-[#EEF2F5] justify-center transition duration-200 ease-in-out transform px-5 py-1 w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#cc5a86]  via-[#EA0F62] to-[#e2a1ba] rounded-2xl hover:translate-y-px "
          >
            <Link onClick={handleLogOut}>log out</Link>
          </button>
  

                
              </div>
            </div>
          </div>):(
             <Link to="/">
          <button
            style={{
              boxShadow:
                "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
            }}
            className="flex text-[#EEF2F5] justify-center transition duration-200 ease-in-out transform px-5 py-1 w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#cc5a86]  via-[#EA0F62] to-[#e2a1ba] rounded-2xl hover:translate-y-px "
            onClick={() => setModalStatus(true)}
          >
            Login
          </button>
        </Link>
          )}
          
    
    </Fragment>
  );

  const handleLogin = (data) => {
    console.log(data);
    setSignInError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSignInUserEmail(data.email);
        setModalStatus(false);
      })
      .catch((error) => {
        console.log(error.message);
        setSignInError(error.message);
      });
  };

  const handleGoogleSignin = () => {
    signInWithGoogle().then((result) => {
      console.log(result.user);
      //     setSignInUserEmail(data.email);
      navigate(form, { replace: true });
      navigate("/");
    });
  };
  return (
    <>
      <div className="sticky top-0 z-10 ">
        <div className = "bg-[#ee7da8] bg-opacity-60" >
          <div className="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
            <div className="relative flex items-center  justify-between ">
              <a
                href="/"
                aria-label="Company"
                title="Company"
                className="inline-flex items-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-2 overflow-hidden rounded-full">
                  <img src={logo} />
                </div>
              </a>
              <ul className="text-black cursor-pointer text-lg items-center hidden space-x-8 lg:flex">
                {menuItems}
              </ul>

              <div className="lg:hidden ">
                <button
                  aria-label="Open Menu"
                  title="Open Menu"
                  className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <svg className="w-5 text-[#EA0F62]" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                    />
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute z-10 top-0 left-0 w-full bg-[#82c1da]">
                    <div className="p-5  border rounded shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <a
                            href="/"
                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center"
                          >
                            <img
                              className="w-[30%] h-[30%] lg:w-[100%] lg:h-[100%] md:h-[80%] md:w-[65%]"
                              src={logo99}
                              alt=""
                            ></img>
                          </a>
                        </div>
                        <div>
                          <button
                            aria-label="Close Menu"
                            title="Close Menu"
                            className="p-2 -mt-2 bg-[#EA0F62]  -mr-2 transition duration-200 rounded hover:bg-[#c7497a] focus:bg-[#EA0F62] focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <svg
                              className="w-5 text-gray-600"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <nav>
                        <ul className="space-y-4 text-start font-bold ">
                          {menuItems}
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {modalStatus && (
          <div
            className="relative z-10"
            // aria-labelledby="modal-title"
            // role="dialog"
            // aria-modal="true"
          >
            <div
              data-aosName="zoom-in"
              className=" lg:ml-60 fixed inset-0 z-10 overflow-y-auto "
            >
              <div className="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl lg:mr-[20%]">
                  <button
                    className="p-2 absolute z-2 bg-[#EA0F62]  right-1 transition duration-200 rounded hover:bg-[#c7497a] focus:bg-[#EA0F62] focus:outline-none focus:shadow-outline"
                    onClick={() => setModalStatus(false)}
                  >
                    <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                      />
                    </svg>
                  </button>
                  <div className="bg-white grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1  pl-4 pt-5 sm:pl-6 sm:pb-10 mx-auto">
                    <div className="flex justify-center items-center">
                      <img className=" w-[80%]" src={loginPhoto}></img>
                    </div>
                    <div className="bg-white z-1 relative  shadow-md  py-8 my-4 lg:px-16 md:px-10 px-16">
                      <form onSubmit={handleSubmit(handleLogin)}>
                        <div>
                          <p>Email</p>
                          <input
                            type="email"
                            {...register("email", {
                              required: "Email Address is required",
                            })}
                            className=" mb-2 rounded shadow-inner placeholder:text-center h-10   focus:outline-blue-800 border-[1px] border-gray-800 w-full "
                          />
                          {errors.email && (
                            <p className="text-red-600">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <p>Password</p>
                          <input
                            {...register("password", {
                              required: "password required",
                              minLength: {
                                value: 6,
                                message:
                                  "password must be 6 character or longer",
                              },
                            })}
                            className=" mb-2 rounded shadow-inner placeholder:text-center h-10   focus:outline-blue-800 border-[1px] border-gray-800 w-full "
                          />
                          {errors.password && (
                            <p className="text-red-600">
                              {errors.password?.message}
                            </p>
                          )}
                        </div>

                        <input
                          className="h-10 cursor-pointer w-full loginButton mt-2 text-white font-semibold rounded bg-pink-400"
                          value="Login"
                          type="submit"
                        ></input>
                        {signInError && (
                          <p className="text-gray-100">{signInError}</p>
                        )}
                      </form>
                      <h2 className="text-xs text-[#207198]">
                        You Dont have an account ?{" "}
                        <Link to="register">
                          <span
                            onClick={() => setModalStatus(false)}
                            className="text-pink-500"
                          >
                            Register
                          </span>
                        </Link>
                      </h2>
                      <div className="flex justify-between items-center">
                        <hr></hr>
                        <h2>or</h2>
                        <hr></hr>
                      </div>

                      <div onClick={() => setModalStatus(false)}>
                        <div
                          onClick={handleGoogleSignin}
                          className="h-10 cursor-pointer w-full px-2  flex justify-start pl-14 gap-4 items-center bg-[#E3F1FE]   mt-2 rounded  border-[1px] border-[#207198] cursor-pointer shadow-sm hover:shadow-lg"
                        >
                          <FcGoogle className="text-lg"></FcGoogle>
                          <h2 className="text-sm text-[#207198]">
                            Continue With Google
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
