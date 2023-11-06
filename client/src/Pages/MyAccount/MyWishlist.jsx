import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { GiPlainCircle } from "react-icons/gi";
import { AuthContext } from "../../Context/AuthProvider";
import Loader from "../../components/Shared/Loader";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";
const MyWishlist = () => {
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();

  // Fetch wishlist data for the logged-in user
  const { data: wishlistData = [], isLoading } = useQuery({
    queryKey: "wishlist", // Unique query key
    queryFn: async () => {
      const res = await fetch(`https://99-pro-shop-server.vercel.app/wishlist?email=${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

  const handleAddToCart = (wishlistData) => {
    if (user && user.email) {
      const product = {
        productId: wishlistData._id,
        name: wishlistData.name,
        photo : wishlistData.photo,
        price: wishlistData.price,
        email: wishlistData.email,
        verification: wishlistData.verification,
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

  return (
    <>
     <div className="bg-sky-100/60 shadow-lg flex justify-between gap-1 my-2 lg:py-2 md:py-2 py-1 rounded-2xl items-center lg:px-8 md:px-2 px-1 lg:w-[16rem] md:w-[15rem] w-[11rem]"> 
                <GiPlainCircle className="text-[#B0DDEF] lg:text-sm md:text-xs text-xs"/>
                  <h2 className="font-medium  tracking-wide font-[Montserrat]  lg:text-md md:text-sm text-xs text-pink-400">My Wishlist</h2>
                <GiPlainCircle className="text-[#B0DDEF] lg:text-sm md:text-xs text-xs"/>
              </div>
         <div className="overflow-hidden">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Bill</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Delivery</th>
                        </tr>
                    </thead>
                     {isLoading ? (
                        <Loader />
                    ) : (
                    <tbody>
                         {wishlistData.map((product) => (
                        <tr key={product.name} className="border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{product.name}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{product.price}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <button
                                onClick={() => handleAddToCart(product)}
                                className="w-[48%] text-[#333333]   font-[Montserrat] bg-pink-50 rounded border-pink-500 border-b-[1px] lg:p-1 p-[3px] lg:text-sm md:text-xs text-xs font-medium transition hover:scale-105"
                                >
                                <span className="flex justify-center items-center gap-2">putin<AiOutlineShoppingCart className="text-sm"/></span>  
                                </button>
                            </td>
                        </tr>
                         ))}
                     
                    </tbody>
                    )}
                </table>
            </div>
    
    </>
  );
};

export default MyWishlist;
