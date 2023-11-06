import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import ProductCard from "../products/ProductCard";
import Loader from "../../components/Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import { GiPlainCircle } from "react-icons/gi";

const Wishlist = () => {
  const { user } = useContext(AuthContext);

  // Fetch wishlist data for the logged-in user
  const { data: wishlistData = [], isLoading } = useQuery({
    queryKey: "wishlist", // Unique query key
    queryFn: async () => {
      const res = await fetch(`https://99-pro-shop-server.vercel.app/wishlist?email=${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-11/12 mx-auto h-screen">
                <div className="bg-sky-100/60 shadow-lg mx-8 flex justify-between  my-2 py-1 rounded-2xl items-center lg:px-8 md:px-4 px-2"> 
          <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
            <h2 className="font-medium tracking-wide font-[Montserrat] lg:mx-6 md:mx-3 mx-2 lg:text-xl mdLtext-lg text-md  text-pink-400"> Your Wishlist: {wishlistData.length ? wishlistData.length : "0"}</h2>
          <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
        </div>
          <div className="productsDiv">
            {wishlistData.map((product) => (
              <ProductCard product={product} key={product.name} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
