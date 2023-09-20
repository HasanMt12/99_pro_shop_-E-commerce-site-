import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import ProductCard from "../products/ProductCard";
import Loader from "../../components/Shared/Loader";
import { useQuery } from "@tanstack/react-query";

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
          <h2 className="text-center lg:text-4xl text-xl font-bold my-3">Favorite Product</h2>
          <p className="w-2/3 mx-auto mb-2 font-light text-slate-500 lg:mb-2 md:text-lg lg:text-xl text-slate-400 text-center">
            Your Wishlist
          </p>
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
