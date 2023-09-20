// import { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../Context/AuthProvider";
// import useCart from "../../../hooks/useCart";
// import { useLocation, useNavigate } from "react-router";


// const ProductDescription = ({productDetails}) => {
//     const { name, price,categoryId, _id, photo  } = productDetails;
//     const {user} = useContext(AuthContext);
//      const navigate = useNavigate();
//     const location = useLocation();
//     const [ , refetch] = useCart();
//     const [count, setCount] = useState(1);
//     const [priceProduct, setPriceProduct] = useState(price);
//     const addCount = () => {
//         setCount((prev) => prev + 1);
//     };

//     const minusCount = () => {
//         if (count > 1) {
//             setCount((prev) => prev - 1);
//         }
//     };
//     // Calculate the priceProduct based on the count and price
//     useEffect(() => {
//     setPriceProduct(count * price);
//     }, [count, price]);

//     const handleAddToCart = () => {
//         // console.log(product);
//         if(user && user.email){
//             const product = {productId: _id, name, photo, price: priceProduct, email: user.email, quantity: count}
//             fetch('https://99-pro-shop-server.vercel.app/cart', {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json'
//                 },
//                 body: JSON.stringify(product)
//             })
//             .then(res => res.json())
//             .then(data => {
//                 if(data.insertedId){
//                     refetch(); // refetch cart to update the number of items in the cart
//                     toast.success(`product on the cart`, {
//                     style: { border: '1px solid #713200', padding: '10px', color: '#713200',},
//                   });
//                 }
//             })
//         }
//         else{
//             Swal.fire({
//                 title: 'Please login First',
//                 icon: 'warning',
//                 iconColor:"#00E0FF",
//                 width:"25%",
//                 color:"#87CEEB",
//                 showCancelButton: true,
//                 confirmButtonColor: '#00E0FF',
//                 cancelButtonColor: '#FFC0CB',
//                 confirmButtonText: 'Login now!'
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   navigate('/login', {state: {from: location}})
//                 }
//               })
//         }
//     }
//     return (
//         <div className="lg:h-[30rem] bg-sky-50 p-4 shadow-sm rounded-lg shadow-sky-300 w-full sm:w-96 md:w-11/12 md:mx-auto lg:w-6/12 items-center">
//                     <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">Home <span className="text-pink-500"> / </span> {categoryId} <span className="text-pink-500">/</span> {name}</p>
//                     <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-pink-500 mt-4">{name}</h2>

//                     <div className=" flex flex-row justify-between  mt-5">
//                         {/*TO DO: I will show review average each product  */}
//                         {/* <div className=" flex flex-row space-x-3">
                            
//                         </div> */}
//                         <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-pink-500 duration-100 cursor-pointer">22 reviews</p>
//                     </div>

//                     <p className=" font-normal text-base leading-6 text-gray-600 mt-7">{categoryId}</p>
//                     <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">$ {price}</p>

//                     <div className="lg:mt-11 mt-10">
//                         <div className="flex flex-row justify-between">
//                             <p className=" font-medium text-base leading-4 text-gray-600">Select quantity</p>
//                             <div className="flex">
//                                 <span onClick={minusCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1">
//                                     -
//                                 </span>
//                                     <input id="counter" aria-label="input" className="border border-gray-300 h-full text-center w-14 pb-1" type="tex                               t" value={count} onChange={(e) => e.target.value} />
//                                 <span onClick={addCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 ">
//                                     +
//                                 </span>
//                             </div>
//                         </div>
//                         <hr className=" bg-gray-200 w-full my-2" />
                   
//                     </div>
//                     <button  onClick={() => handleAddToCart(productDetails)} className="hover:bg-sky-300/90 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-sky-800/80 bg-sky-300/30 w-full py-5 my-2">Add to shopping bag</button>
//                 </div>
//     );
// };

// export default ProductDescription;

import  { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";
import useCart from "../../../hooks/useCart";
import { useLocation, useNavigate } from "react-router";

const ProductDescription = ({ productDetails }) => {
  // Destructure productDetails object
  const { name, price, categoryId, _id, photo } = productDetails;

  // Access user and navigate function from context and hooks
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
   const [ , refetch] = useCart();

  // Use state to manage quantity and priceProduct
  const [count, setCount] = useState(1);
  const [priceProduct, setPriceProduct] = useState(price);

 const addCount = () => {
    setCount((prev) => prev + 1);
  };

  // Function to decrement quantity (minimum 1)
  const minusCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }  // Function to increment quantity
 
  };

  // Calculate the priceProduct based on the count and price
  useEffect(() => {
    setPriceProduct(count * price);
  }, [count, price]);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    if (user && user.email) {
      const product = {
        productId: _id,
        name,
        photo,
        price: priceProduct,
        email: user.email,
        quantity: count,
      };

      // Send a POST request to add the product to the cart
      fetch("https://99-pro-shop-server.vercel.app/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            // Successfully added to cart, refetch cart data
            refetch();

            // Show a success toast notification
            toast.success(`Product added to the cart`, {
              style: {
                border: "1px solid #713200",
                padding: "10px",
                color: "#713200",
              },
            });
          }
        });
    } else {
      // Show a login prompt using SweetAlert2
      Swal.fire({
        title: "Please login first",
        icon: "warning",
        iconColor: "#00E0FF",
        width: "25%",
        color: "#87CEEB",
        showCancelButton: true,
        confirmButtonColor: "#00E0FF",
        cancelButtonColor: "#FFC0CB",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the login page with the current location as the "from" state
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="lg:h-[30rem] bg-sky-50 p-4 shadow-sm rounded-lg shadow-sky-300 w-full sm:w-96 md:w-11/12 md:mx-auto lg:w-6/12 items-center">
      {/* Breadcrumb */}
      <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
        Home <span className="text-pink-500"> / </span> {categoryId}{" "}
        <span className="text-pink-500">/</span> {name}
      </p>

      {/* Product Name */}
      <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-pink-500 mt-4">
        {name}
      </h2>

      {/* Reviews */}
      <div className="flex flex-row justify-between mt-5">
        <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-pink-500 duration-100 cursor-pointer">
          22 reviews
        </p>
      </div>

      {/* Category */}
      <div className="font-normal lg:h-[6rem] text-base text-sky-500 leading-6  mt-7">
      Product Category:  {categoryId}
      </div>

      {/* Price */}
      <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6">
       ৳ {price}
      </p>

      {/* Quantity Selector */}
      <div className="lg:mt-11 mt-10 ">
        <div className="flex flex-row justify-between">
          <p className="font-medium text-base leading-4 text-gray-600">
            Select quantity
          </p>
          <div className="flex">
            <span
              onClick={minusCount}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
            >
              -
            </span>
            <input
              id="counter"
              aria-label="input"
              className="border border-gray-300 h-full text-center w-14 pb-1"
              type="text"
              value={count}
              readOnly
            />
            <span
              onClick={addCount}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1"
            >
              +
            </span>
          </div>
        </div>
        <hr className="bg-gray-200 w-full my-2" />
        
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="hover:bg-sky-300/90 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-sky-800/80 bg-sky-300/30 w-full py-5 my-2"
      >
        Add to shopping bag
      </button>
    </div>
  );
};

export default ProductDescription;
