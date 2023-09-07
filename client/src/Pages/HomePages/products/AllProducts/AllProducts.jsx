import { useRef, useState } from "react";
import ProductCard from "../ProductCard";
import {  MdOutlineShoppingCart } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";


const AllProducts = () => {
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10)

     const {data: allProduct = [search],refetch  } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async() =>{
            const res = await fetch(`https://99-pro-shop-server.vercel.app/allProducts?search=${search}`);
            const data = await res.json();
            return data; 
        }
     });


      const handleSearch = (event) => {
        if (event.key === 'Enter') {
     setSearch(searchRef.current.value);
    }
        // console.log(searchRef.current.value);
        setSearch(searchRef.current.value);
        refetch()
      }

    
    return (
        <div className="mt-10 lg:mx-[8rem] rounded-md shadow-sm shadow-[#b4cbda] bg-[#f3f6f8]">
            <div className="flex justify-between items-center px-2 lg:mx-0 mx-2 lg:text-lg md:text-md text-sm">
                <div className="text-sky-500 flex justify-center gap-1 items-center  ">
                  <h2  data-aos="zoom-in" className="font-bold my-4 ">Just For You</h2>
                  < MdOutlineShoppingCart></ MdOutlineShoppingCart>
                  </div> 

             {/* search input */}
              <div className="relative  lg:w-[20rem] md:w-[15rem] w-[12rem]  my-1">
                <input 
                  ref={searchRef}   onKeyDown={handleSearch} placeholder="Search for products"
                className=" lg:p-[0.7rem] md:p-[0.5rem] p-[0.3rem] lg:pl-[2.5rem] pl-[2rem] block w-full placeholder-pink-300 outline-pink-300 rounded-lg text-sm border-sky-300 border-2"
                  />
                <div onClick={handleSearch} 
                className="absolute inset-y-0  left-0 flex items-center pointer-events-none pl-4">
                  <svg className="h-3.5 w-3.5 cursor-pointer text-sky-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </div>
              </div>
            </div> 
         
            
              <div className="productsDiv">
                    {allProduct && 
                    allProduct.slice(0, limit).map((product, key) => (
                       <ProductCard key={key} product={product}>
                       </ProductCard>              
                    ))}
            </div>
           <br></br>
            <div className="text-center pb-2">
        {" "}
         <div className="flex justify-center items-center">
       
          <button  onClick={() => setLimit(limit + 10)}style={{boxShadow:"0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)"}}
            className='flex text-[#EEF2F5] justify-center items-center transition duration-200 ease-in-out transform lg:w-[6rem] lg:h-[2.4rem] w-[4rem] h-[1.5rem] border-b-4 border-[#df81a5]  bg-gradient-to-t from-[#cc5a86]  via-[#EA0F62] to-[#e2a1ba] rounded-2xl lg:text-[14px] text-[8px] hover:translate-y-px '>
            See More
          </button>
     
        </div> 
      
      </div>
      
    </div>
    );
};

export default AllProducts;