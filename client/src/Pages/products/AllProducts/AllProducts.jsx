import {  useRef, useState } from "react";
import ProductCard from "../ProductCard";
import { useQuery } from "@tanstack/react-query";
import { GiPlainCircle  } from 'react-icons/gi';
import {  GrFormNextLink } from 'react-icons/gr';
import ScrollToMiddle from "../../../hooks/ScrollToMiddile";

const AllProducts = () => {
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: allProduct = { products: [], currentPage: 1, totalPages: 1 }, refetch, isLoading } = useQuery({
        queryKey: ['allProduct', search, currentPage], // Add search and currentPage to the queryKey
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allProducts?search=${search}&page=${currentPage}`);
            const data = await res.json();
            return data;
        },
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

   const handleSearch = () => {
    const newSearch = searchRef.current.value;
    setSearch(newSearch);
    setCurrentPage(1);
    setSearchVisible(false); // Hide the input field after searching
  };

  const toggleSearch = () => {
    setSearchVisible(true);
  };


  const handleInputChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };
  


    
    return (
      <ScrollToMiddle>
        <div className="mt-10 lg:mx-[8rem] rounded-md shadow-sm shadow-[#b4cbda] bg-[#f3f6f8]">
            <div className="flex justify-between items-center  px-2 lg:mx-0 mx-2 lg:text-lg md:text-md text-sm">
            <div className="bg-sky-100/60 flex justify-between gap-1 my-2 py-1 rounded-2xl items-center lg:px-8 md:px-2 px-2 lg:w-[16rem] md:w-[15rem] w-[11rem]"> 
                <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
                  <h2 className="font-medium  tracking-wide font-[Montserrat]  lg:text-md md:text-sm text-xs text-pink-500">Feature Product</h2>
                <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
              </div>

             {/* search input */}
  
       <div className="relative">
        {isSearchVisible ? (
          <input
            ref={searchRef}
            placeholder="Search... "
            onBlur={handleInputChange}
            className="lg:p-[0.4rem] md:p-[0.2rem] p-[0.1rem] bg-sky-100/60 lg:pl-[2.5rem] md:pl-[2rem] pl-[1.5rem] block w-full placeholder-pink-400 placeholder-text-xs outline-pink-300 rounded-lg text-sm border-sky-400/60 border-[1px]"
          />
        ) : (
          <button onClick={toggleSearch} className="flex justify-center items-center p-1 cursor-pointer gap-1 rounded-md border-b-[1px] border-sky-400 bg-sky-100  text-sky-500">
          
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg> 
            <span className="text-sm text-pink-500 tracking-wide">search here..</span>
          </button>
        )}
        {isSearchVisible && (
          <>
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none lg:pl-4 md:pl-2 pl-2">
            <svg onClick={handleSearch} className="h-3.5 w-3.5 cursor-pointer text-sky-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
           <button className="absolute inset-y-1 right-1 text-sky-500 rounded-sm border-b-[1px] border-sky-500 tracking-wide bg-sky-50 text-sm text-center px-2 ">Click</button>
        </>)}
      </div>
            </div> 
         
            
              <div className="productsDiv">
             {Array.isArray(allProduct.products) ? (
                
                    allProduct.products.map((product, key) => (
                       <ProductCard key={key} product={product} loading={isLoading}>
                       </ProductCard>              
                    ))): (
                  <div>No products found</div>
                )}
            </div>
           <br></br>
            <div className="text-center pb-2">
        {" "}
         <div className="flex justify-center items-center">
       
        </div> 
          {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2">
  <button
    onClick={() => {
      const newPage = allProduct.currentPage - 1;
      if (newPage >= 1) {
        setCurrentPage(newPage);
        refetch({ page: newPage });
      }
    }}
    disabled={allProduct.currentPage === 1}
    className="border-b shadow-md p-1 shadow-[#e9b0c6] rounded-lg border-[#e25a8e] hover:border-[#5ab9e2] hover:border-b flex justify-center gap-2 items-center"
  >
  <span className="text-sm text-sky-500"> Previous Page</span> <GrFormNextLink />
  </button>

  <span>Page {allProduct.currentPage} of {allProduct.totalPages}</span>

  <button
    onClick={() => {
      const newPage = allProduct.currentPage + 1;
      if (newPage <= allProduct.totalPages) {
        setCurrentPage(newPage);
        refetch({ page: newPage });
      }
    }}
    disabled={allProduct.currentPage === allProduct.totalPages}
    className="border-b shadow-md p-1 shadow-[#e9b0c6] rounded-lg border-[#e25a8e] hover:border-[#5ab9e2] hover:border-b flex justify-center gap-2 items-center"
  >
   <span className="text-sm text-sky-500"> Next Page</span> <GrFormNextLink />
  </button>
</div>


      
      </div>
      
    </div>
</ScrollToMiddle>
    );
};

export default AllProducts;