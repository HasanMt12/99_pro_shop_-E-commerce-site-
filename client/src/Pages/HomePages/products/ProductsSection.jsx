
import { useEffect } from "react";

import ProductCard from "./ProductCard";
 import {  MdOutlineShoppingCart } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLoaderData } from "react-router-dom";
const ProductsSection = () => {
     const allProduct = useLoaderData()

  
     console.log(allProduct);
  
    // const [limit] = useState(12)
    // useEffect(() => {
    //     // Data fetching code goes here
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://99-pro-server.vercel.app/allProducts');
    //             const data = await response.json();
    //             setAllProducts(data)
               
    //             // Update state or do something with the fetched data
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

      useEffect(()=>{
    Aos.init({duration:1200})
  },[])
    return (
         <div className="px-20">
            <div className="flex justify-center items-center gap-2 text-[#df3b6c]">
                 <h2  data-aos="zoom-in" className="font-bold  text-center  lg:text-xl text-lg my-4 "> {(allProduct.categoryId === "BeautyProducts"&&"b") }</h2>
                < MdOutlineShoppingCart></ MdOutlineShoppingCart>
            </div> 
              <div className="section">
            {allProduct && 
                    allProduct.map((product, key) => (
                       <ProductCard key={key} product={product}>

                       </ProductCard>
                         
                        
                    ))
                    }
        </div>
           <br></br>
          
        </div>
    );
};

export default ProductsSection;