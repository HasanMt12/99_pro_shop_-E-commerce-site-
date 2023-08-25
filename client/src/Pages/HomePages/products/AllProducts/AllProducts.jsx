
import { useEffect, useRef, useState } from "react";

import ProductCard from "../ProductCard";
 import {  MdOutlineShoppingCart } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import { useQuery } from "@tanstack/react-query";


const AllProducts = () => {
      const searchRef = useRef(null);
    const [search, setSearch] = useState('');
     const [limit, setLimit] = useState(12)
    //  const [allProduct, setAllProduct] = useState([]);

     const {data: allProduct = [search],refetch  } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async() =>{
            const res = await fetch(`https://99-pro-server.vercel.app/allProducts?search=${search}`);
            const data = await res.json();
            return data; 
        }
     });

      
    // useEffect(() => {
    //     fetch(`https://99-pro-server.vercel.app/allProducts?search=${search}`)
    //         .then(res => res.json())
    //         .then(data => setAllProduct(data));
    // }, [ search])
console.log(allProduct)
      const handleSearch = (event) => {
        if (event.key === 'Enter') {
     setSearch(searchRef.current.value);
    }
        console.log(searchRef.current.value);
        setSearch(searchRef.current.value);
        refetch()
      }

    
    
    useEffect(()=>{
    Aos.init({duration:1200})
  },[])
    return (
        <div>
            <div className="flex justify-center items-center gap-2 text-[#df3b6c]">
                 <h2  data-aos="zoom-in" className="font-bold  text-center  lg:text-xl text-lg my-4 "> All Products</h2>
                < MdOutlineShoppingCart></ MdOutlineShoppingCart>
            </div> 
            {/* search input */}
            <div className="relative lg:ml-2 lg:max-w-xs md:max-w-[240px] max-w-[200px]  my-1">
            <input 
              ref={searchRef}   onKeyDown={handleSearch} placeholder="Search for products"
             className=" p-[0.7rem] pl-[2.5rem] block w-full placeholder-pink-300 outline-pink-300 rounded-lg text-sm border-sky-200/80 border-2"
              />
            <div onClick={handleSearch} 
             className="absolute inset-y-0  left-0 flex items-center pointer-events-none pl-4">
              <svg className="h-3.5 w-3.5 cursor-pointer text-sky-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
          </div>
              <div className="section">
            {allProduct && 
                    allProduct.slice(0, limit).map((product, key) => (
                       <ProductCard key={key} product={product}>
                       </ProductCard>              
                    ))
                    }
        </div>
           <br></br>
            <div className="text-center pb-2">
        {" "}
         <div className="flex justify-center items-center">
       
          <button 
          onClick={() => setLimit(limit + 8)}
          style={{boxShadow:"0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)"}}
            className='flex text-[#EEF2F5] justify-center items-center transition duration-200 ease-in-out transform lg:w-[6rem] lg:h-[2.4rem] w-[4rem] h-[1.5rem] border-b-4 border-[#df81a5]  bg-gradient-to-t from-[#cc5a86]  via-[#EA0F62] to-[#e2a1ba] rounded-2xl lg:text-[14px] text-[8px] hover:translate-y-px '>
          See More
          </button>
     
        </div> 
      
      </div>
      
        </div>
    );
};

export default AllProducts;