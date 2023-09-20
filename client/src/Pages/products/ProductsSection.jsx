import ProductCard from "./ProductCard";
import { useLoaderData } from "react-router-dom";
import CategoriesCard from "../../Pages/categories/CategoriesCard";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

const ProductsSection = () => {
     const allProduct = useLoaderData()
      const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate a data fetch (replace with your actual data fetching logic)
    setTimeout(() => {
    
      setData(allProduct);
      setLoading(false);
    }, 3000); // Simulate a 2-second delay
  }, []);
    return (
         <div className="lg:px-20 px-3  lg:mx-[6rem] min-h-screen">
      {/* fetching categories  */}
            <CategoriesCard></CategoriesCard>
            <div>
      {loading ? (
        // Render loading skeletons while data is being fetched
        <div className="productsDiv ">
          <Skeleton count={5} height={30} />
        </div>
      ) : (
        // Render your actual data once it's fetched
        <div className="productsDiv ">
          {/* {data.map((item, index) => (
            <div key={index}>{item}</div>
          ))} */}
          {data && 
                    data.map((product, key) => (
                      <ProductCard key={key} product={product}>
                      </ProductCard>                       
                  ))}
        </div>
      )}
    </div>
             
        </div>
    );
};

export default ProductsSection;