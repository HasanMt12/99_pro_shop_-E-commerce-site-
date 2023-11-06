
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import {  useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineShoppingCart , AiOutlineHeart} from 'react-icons/ai';
const ProductCard = ({ product }) => {
  const { photo, name, price, verification, _id } = product;
console.log(product)
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const from = `categories/product/${_id}`;

  // Determine whether to show the button based on the route
  const showButton = location.pathname !== '/wishlist';
  const showDeleteButton = location.pathname === '/wishlist';
    
  const handleRedirectClick = () => {
    // Redirect to the desired route when the <div> is clicked
    navigate(from, { replace: true });
    navigate(`categories/product/${_id}`);
  };

  // const [fill, setFill] = useState(false);

  const handleWishList = (product) => {
    const dbWishlist = { ...product };
    dbWishlist.email = user?.email;
    dbWishlist.color = "pink";
    delete dbWishlist._id;
    
   // Check if the product is already in the cart
    const isProductInWishlist = wishlist.some((item) => item. _id === product. _id);

    if (isProductInWishlist) {
      // Product is already in the cart, show a toast or alert
      Swal.fire({
        text: 'Product is already in your cart. Please check your cart 🛒.',
        color: "#DC143C",
        confirmButtonColor: '#4169E1',
        confirmButtonText: 'My cart'}).then((result) => {
        if (result.isConfirmed) {
          navigate('/cart', { state: { from: location } });
        }
      });
    } else{

    fetch("https://99-pro-shop-server.vercel.app/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dbWishlist),
    })
      .then((res) => res.json())
      .then((result) => {
        // setFill(true);
        console.log(result);
        toast.success("added to wishlist successfully");
      })
      .catch((err) => toast.error(err.message));
  }};

  const handleAddToCart = () => {
    if (user && user.email) {
      const product = {
        productId: _id,
        name,
        photo,
        price,
        email: user.email,
        verification,
        quantity: 1,
      };

       // Check if the product is already in the cart
    const isProductInCart = cart.some((item) => item.productId === product.productId);

    if (isProductInCart) {
      // Product is already in the cart, show a toast or alert
      Swal.fire({
        text: 'Product is already in your cart. Please check your cart 🛒.',
        color: "#DC143C",
        confirmButtonColor: '#4169E1',
        confirmButtonText: 'My cart'}).then((result) => {
        if (result.isConfirmed) {
          navigate('/cart', { state: { from: location } });
        }
      });
    } else {

      fetch('https://99-pro-shop-server.vercel.app/cart', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch(); // Refetch cart to update the number of items in the cart
            toast.success(`product on the cart`, {
              style: { border: '1px solid #713200', padding: '10px', color: '#713200' },
            });
          }
        });
      }
    } else {
      Swal.fire({
        text: 'Please login First',
        icon: 'warning',
        iconColor: "#00E0FF",
        color: "#DC143C",
        showCancelButton: true,
        confirmButtonColor: '#4169E1',
        cancelButtonColor: '#DC143C',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  const queryClient = useQueryClient();

  const handleDelete = async (id) => {
    const proceed = window.confirm('Are you sure, you want to cancel this order');
    
    if (proceed) {
      try {
        const response = await fetch(`https://99-pro-shop-server.vercel.app/wishlist/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.deletedCount > 0) {
          const remaining = wishlist.filter((odr) => odr._id !== id);
          setWishlist(remaining);
          toast.success('Deleted successfully');

          // Refetch the wishlist data to update it
          await queryClient.invalidateQueries('wishlistData'); // Replace 'wishlistData' with your query key
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };
  return (
    <>
      
      <div
        className="my-2 mx-2 p-2 bg-white border-b shadow-md shadow-[#e9b0c6] rounded-lg border-[#e25a8e] hover:border-[#5ab9e2] hover:border-b relative block overflow-hidden"
      >
        <img
          data-aosName="fade-down"
          src={photo}
          alt=""
          className="h-[50%]  w-full cursor-pointer object-cover transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110  sm:h-[50%]"
        />
        <div className="px-1 pt-2">
          <div className="flex justify-between items-start md:text-[0.6rem] text-[0.5rem] lg:text-[0.8rem]">
            <h3 className="font-semibold text-pink-400"  >
              {name}
            </h3>
            <AiOutlineHeart className="text-pink-400 cursor-pointer lg:text-lg md:text-md text-md hover:font-bold"
             onClick={() => handleWishList(product)} title="added to wishlist"></AiOutlineHeart>
          </div>
          
          <div className="flex justify-between items-center absolute lg:bottom-12 md:bottom-12 bottom-8">
            <p
              className="lg:mt-1   lg:text-sm mr-4  text-xs text-gray-700"
            >
              <span className="text-sky-400 font-bold">৳ {price}</span>
            </p>
            <p>{verification && <h2 className="text-pink-400 line-through">stock out</h2>}</p>
          </div>

          <div className="flex justify-between items-center w-[95%] gap-1 inset-x-0 absolute lg:bottom-[5px] bottom-1 mx-auto">
            {showButton && (
              <button
                onClick={handleRedirectClick}
                className="w-[48%] text-[#333333] font-[Montserrat] bg-sky-50 rounded border-sky-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs transition hover:scale-105"
              >
              Details
              </button>
            )}

            <button
              onClick={() => handleAddToCart(product)}
              className="w-[48%] text-[#333333]   font-[Montserrat] bg-pink-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs font-medium transition hover:scale-105"
            >
              <span className="flex justify-center items-center gap-1">put in<AiOutlineShoppingCart className="text-sm"/></span>  
            </button>
            
            {showDeleteButton && (
              <button
                onClick={() => handleDelete(_id)}
                className="w-[48%] text-sky-500 tracking-wide font-[Montserrat] bg-sky-50 rounded border-sky-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs transition hover:scale-105"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
     
       
    </>
  );
};

export default ProductCard;
