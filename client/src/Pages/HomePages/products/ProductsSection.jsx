
import { useEffect } from "react";

import ProductCard from "./ProductCard";
 import {  MdOutlineShoppingCart } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLoaderData } from "react-router-dom";
import CategoriesCard from "../categories/CategoriesCard";

const ProductsSection = () => {
     const allProduct = useLoaderData()
     console.log(allProduct);

    useEffect(()=>{
    Aos.init({duration:1200})
  },[])
    return (
         <div className="lg:px-20 px-3  lg:mx-[6rem]">
            {/* fetching categories  */}
            <CategoriesCard></CategoriesCard>
              <div className="productsDiv ">
                  {allProduct && 
                    allProduct.map((product, key) => (
                      <ProductCard key={key} product={product}>
                      </ProductCard>                       
                  ))}
            </div>
           <br> </br>
          
        </div>
    );
};

export default ProductsSection;