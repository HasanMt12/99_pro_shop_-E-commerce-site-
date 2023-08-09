import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ProductAction = () => {

      const [axiosSecure] = useAxiosSecure();

       const {data: products = [] , refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async() =>{
            const res = await fetch('https://99-pro-server.vercel.app/allProducts');
            const data = await res.json();
   
            return data;
            
        }
    });

     const handleMakeStockout = id => {
        fetch(`https://99-pro-server.vercel.app/allProducts/verify/${id}`, {
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

     const handleDeleteProduct = id =>{
      fetch(`https://99-pro-server.vercel.app/allProducts/${id}`, {
        method: 'DELETE', 
        
      })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount > 0){
          refetch()
          toast.success('deleted successfully')
        }
        
      })
    }

    const handleDelete = item => {
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

                axiosSecure.delete(`/allProducts/${item._id}`)
                    .then(res => {
                        console.log('deleted res', res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success('deleted successfully')
                        }
                    })

            }
        })
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-sans">All Products</h2>
      <div className="overflow-x-auto">
        
            {products.map((product, i) => (
                <div key = {product._id}
                className = "rounded-xl  w-10/12 mx-auto my-4 p-4 border-b-2 border-pink-500  bg-gray-50" >

    <a href="" className="block shrink-0">
      <img
        alt="Speaker"
        src={product.photo}
        className="h-14 w-14 rounded-lg object-cover"
      />
    </a>

    <div>
      <h3 className="font-medium sm:text-lg">
        <a href="#" className="hover:underline">
        {product.name}
        </a>
      </h3>
     
  </div>
 
<div className="flex justify-between items-center">
    <button onClick={() => handleDelete(product._id)}  className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-red-600 px-3 py-1.5 text-white">Delete</button>
    {product?.verification !== "stockOut" ? (
                       <strong onClick={() => handleMakeStockout(product._id)}
      className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-pink-600 px-3 py-1.5 text-white"
    >


      <span className="text-[10px] font-medium sm:text-xs">Make a Product stockOut </span>
    </strong>
                    ) : (
                       <strong
      className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white"
    >
       <svg
        // eslint-disable-next-line react/no-unknown-property
        xmlnsName="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg> 

      <span className="text-[10px] font-medium sm:text-xs">StockOut</span>
    </strong>
    
                    )}

  </div> 

  
                  
</div>
              
            ))}
         
      </div>
        </div>
    );
};

export default ProductAction;