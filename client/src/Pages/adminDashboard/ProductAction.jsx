import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
   
const ProductAction = () => {
       const searchRef = useRef(null);
    const [search, setSearch] = useState('');
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
   
       const { data: allProduct = { products: [], currentPage: 1, totalPages: 1 }, refetch, isLoading } = useQuery({
        queryKey: ['allProduct', search, currentPage], // Add search and currentPage to the queryKey
        queryFn: async () => {
            const res = await fetch(`https://99-pro-shop-server.vercel.app/allProducts?search=${search}&page=${currentPage}`);
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

     const handleMakeStockout = id => {
        fetch(`https://99-pro-shop-server.vercel.app/allProducts/verify/${id}`, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
         
            if(data.modifiedCount > 0 ){
                toast.success('make product stock out successfully')
                refetch();
            }
        })
    }

      const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
          
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

            fetch(`https://99-pro-shop-server.vercel.app/allProducts/${id}`, {
        method: 'DELETE', 
        
      })
                 .then(res => res.json())
                 
      .then(data => {
         console.log('deleted res', data);
        if(data.deletedCount > 0){
          refetch()
          toast.success('deleted successfully')
        }
          refetch();
      })

            }
        })
    }
    return (
      <>
      <div className="max-w-[90rem] py-2 mx-auto">

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden  ">
            
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 ">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 ">
                      products
                    </h2>
                    <p className="text-sm text-gray-600 ">
                      Add products, edit and more.
                    </p>
                  </div>

                  <div>
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
                        <span className="text-sm text-pink-400 tracking-wide">search here..</span>
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
                </div>
          

              
                <table className="min-w-full divide-y mx-6  divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      

                      <th scope="col" className="pl-6lg:pl-3 xl:pl-0 pr-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Name
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Action 
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Status
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          number 
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Created Acc
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-right"></th>
                    </tr>
                  </thead>
              {Array.isArray(allProduct.products) ? (           
             allProduct.products.map((product , key) => (
              <tbody key={key} className="divide-y divide-gray-200 ">
                  
                    <tr className=" ">
                    
                      <td className="h-px w-px  whitespace-nowrap">
                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                          <div className="flex items-center gap-x-3">
                            <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-lg" src={product.photo?product.photo:"https://i.ibb.co/0QZCv5C/png-clipart-product-profile-computer-icons-login-product-avatars-monochrome-black.png"} alt="Image Description"/>
                            <div className="grow">
                              <span className="block text-sm font-semibold text-gray-800 ">{product.name?product.name:"product"}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                            <td onClick={() => handleDelete(product._id)} className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3 cursor-pointer">
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-red-100 text-red-800 ">
                                  <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                  </svg>
                                  delete
                                </span>
                              </div>
                            </td>
                      {product?.verification !== "stockOut" ? (
                            <td onClick={() => handleMakeStockout(product._id)}className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3 cursor-pointer">
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 ">
                                  <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                  </svg>
                                  make a stock out
                                </span>
                              </div>
                            </td>
                      ) : (
                          <td  className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-sky-100 text-sky-800 ">
                                  <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                  </svg>
                                  stock out 41`product
                                </span>
                              </div>
                          </td>
                      )}
                  
                      <td  className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-pink-100 text-pink-800 ">
                                 $ {product.price}
                                </span>
                              </div>
                      </td>
                      <td className="h-px w-px whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="text-sm text-gray-500">{product.created?product.created:"null"}</span>
                        </div>
                      </td>
                      <td className="h-px w-px whitespace-nowrap">
                        <div className="px-6 py-1.5">
                          <a className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">
                            edit
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))): (
                  <div>No products found</div>
                )}
                  
                </table>
              
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 ">
                  <div>
                    <p className="text-sm text-gray-600 ">
                      <span className="font-semibold text-gray-800 ">{currentPage}</span> page
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button type="button"
                       onClick={() => {
                        const newPage = allProduct.currentPage - 1;
                        if (newPage >= 1) {
                          setCurrentPage(newPage);
                          refetch({ page: newPage });
                        }
                      }}
                      disabled={allProduct.currentPage === 1}
                      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm      ">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        Prev
                      </button>

                      <button type="button"
                       onClick={() => {
                          const newPage = allProduct.currentPage + 1;
                          if (newPage <= allProduct.totalPages) {
                            setCurrentPage(newPage);
                            refetch({ page: newPage });
                          }
                        }}
                        disabled={allProduct.currentPage === allProduct.totalPages}
                      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm      ">
                        Next
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
};

export default ProductAction;