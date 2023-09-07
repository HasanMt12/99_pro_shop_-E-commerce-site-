
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLocation, useNavigate } from "react-router-dom";
 import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";

import { toast } from "react-hot-toast";
const ProductCard = ({ product }) => {
  const { photo, name, price, verification ,  _id } = product;
 
    const {user} = useContext(AuthContext);
    const [ , refetch] = useCart();
    // const [, refetch] = useWishlist();
    const navigate = useNavigate();
    const location = useLocation();


 const [fill, setFill] = useState(false);

  const handleWishList = (product) => {
    const dbWishlist = { ...product };
    dbWishlist.email = user?.email;
    dbWishlist.color = "red";
    delete dbWishlist._id;

    fetch("https://99-pro-shop-server.vercel.app/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dbWishlist),
    })
      .then((res) => res.json())
      .then((result) => {
        setFill(true);
        
        console.log(result);
        toast.success("added successfully");
      })
      .catch((err) => toast.error(err.message));
  };


    const handleAddToCart = () => {
        // console.log(product);
        if(user && user.email){
            const product = {productId: _id, name, photo, price, email: user.email, verification}
            fetch('https://99-pro-shop-server.vercel.app/cart', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    refetch(); // refetch cart to update the number of items in the cart
                    toast.success(`product on the cart`, {
            style: {
              border: '1px solid #713200',
              padding: '10px',
              color: '#713200',
            },
           
          });
                }
            })
        }
        else{
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login', {state: {from: location}})
                }
              })
        }
    }
      
   

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <>
      <div className=" my-2 mx-2 p-2  bg-white border-b shadow-md shadow-[#e9b0c6] rounded-lg border-[#e25a8e] relative block overflow-hidden">
        <img
          data-aosName="fade-down"
          src={photo}
          alt=""
          className="h-[50%] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[50%]"
        />

        <div className="px-1 pt-2">
         
          <div className="flex justify-between items-start md:text-[0.6rem] text-[0.5rem] lg:text-[0.8rem]">
            <h3
              // data-aosName="fade-right"
              className=" font-semibold text-[#c73f8a]"
            >
              {name}
            </h3>
            <button onClick={() => handleWishList(product)}  >
              <svg
              
                xmlns="http://www.w3.org/2000/svg"
                fill={fill.color ? fill.color : "pink"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="lg:w-6 lg:h-6 md:h-4 md:w-4 h-3 w-3 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
<div className="flex justify-between items-center absolute lg:bottom-12 md:bottom-12 bottom-8">
 <p // data-aosName="fade-right"
            className="lg:mt-1   lg:text-sm mr-4  text-[10px] text-gray-700"
          >
            <span className="text-green-500 font-bold">৳ {price}</span> 

          </p>
         <p>{verification && <h2 className="text-red-300/100 line-through">stock out</h2>}</p> 

</div>
         

          <button
            onClick={() => handleAddToCart(product)}
            className=" w-[92%] inset-x-0 absolute lg:bottom-[5px] bottom-1 mx-auto text-white rounded bg-[#f396ba] lg:p-1 p-[3px] lg:text-sm text-xs  font-medium transition hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>

     </>
  );
};

export default ProductCard;
