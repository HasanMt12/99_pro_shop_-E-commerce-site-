import { useContext,  useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import PaymentModal from "../Payment/PaymentModal";


const AddTocart = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

      // const [openTab, setOpenTab] = useState(1);
      const [modalStatus, setModalStatus] = useState(false);
      const [cart, setCart] = useState([])
      const { user } = useContext(AuthContext);

      const {data: data = [] , refetch } = useQuery({
        queryKey: ['data'],
        queryFn: async() =>{
            const res = await fetch(`https://99-pro-shop-server.vercel.app/cart?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
      });


  //cart delete
  const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to cancel this order');
        if (proceed) {
            fetch(`https://99-pro-shop-server.vercel.app/cart/${id}`, {
                method: 'DELETE',
               
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = cart.filter(odr => odr._id !== id);
                         setCart(remaining);
                         refetch()
                         toast.success('deleted successfully')
                    }
                })
        }
    }


     // make cart plus / add to cart
    const handleMakePlusCart = id => {
        fetch(`https://99-pro-shop-server.vercel.app/cart/${id}`, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0 ){
                toast.success('make cart Plus successfully')
                refetch();
            }
        })
     }

      // make cart Minus / remove to cart
    const handleMakeMinusCart = id => {
        fetch(`https://99-pro-shop-server.vercel.app/cart/cartMinus/${id}`, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0 ){
                toast.success('make cart Minus successfully')
                refetch();
            }
        })
     }

    return (

    <div className="min-h-screen px-4">
     <div className="flex justify-evenly items-start gap-2"> 
      <div className="flex flex-col w-[65%]">
        <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead>
                    <tr>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">product</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                      <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cart Update</th>
                       <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase">Buy </th>
                      <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase">Delete</th>
                    </tr>
                  </thead>
                    <tbody>
                      {data.map((product) => (
                    <>
                      <tr key={product._id} className="odd:bg-sky-100/60 even:bg-sky-200/40 ">
                        <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
                          <img src={product.photo} className="w-[5rem]"></img>
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{product.name}</td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 ">{product.price}</td>
                        <td className="flex justify-center items-center px-2 py-6 whitespace-nowrap text-sm font-medium text-gray-800">
                          <button className="px-2 py-1 bg-sky-300/60 hover:bg-sky-400/60"
                           onClick={()=>handleMakePlusCart(product._id)}>+</button>
                          <p className="mx-2">{product.quantity}</p>
                          <button className='px-2 py-1 bg-sky-300/60 hover:bg-sky-400/60'
                           onClick={()=>handleMakeMinusCart(product._id)}>-</button>
                        </td>
                        <td
                          onClick={() => {
                            setSelectedProduct(product);
                            setModalStatus(true);
                          }}
                          className="px-2 py-4 cursor-pointer whitespace-nowrap text-right text-2xl  font-medium"
                        >
                          buy now
                        </td>
                        <td onClick={() => handleDelete(product._id)} className="px-2 py-4 cursor-pointer whitespace-nowrap text-right text-2xl text-pink-600 hover:text-pink-500 hover:text-3xl font-medium"><MdDeleteForever></MdDeleteForever>
                        </td>
                        </tr>
        {/* payment Modal */}
              {modalStatus && (
                  <PaymentModal
                      product={selectedProduct}
                      modalStatus={setModalStatus}
                 ></PaymentModal>
              )}

                  </>
                  ))}
                    </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
      <div> Order summery</div>
     </div>   
    </div>
    );
};

// feat: Implement interactive shopping cart with real-time updates

// - Added a new shopping cart display using a table layout.
// - Implemented functionality to handle cart item quantity adjustments with plus and minus buttons.
// - Ensured that cart item quantity does not go below 1.
// - Updated cart item prices in real-time based on user actions.

// [Include additional context or details about the changes if necessary]

// Resolves: #issue_number

export default AddTocart;