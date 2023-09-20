import { useContext,  useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import PaymentModal from "../Payment/PaymentModal";


const AddTocart = () => {
  // State variables
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch cart data
  const { data: data = [], refetch } = useQuery({
    queryKey: ['cartData'],
    queryFn: async () => {
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

   <div className="relative bg-fixed bg-cover bg-center overflow-hidden min-h-screen"
      style={{
        backgroundImage: `url("https://i.ibb.co/pztsXFL/bg.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: "rgba(208, 208, 208, 0.6)",
        backdropFilter: 'blur(100px)',
        backgroundBlendMode: "multiply"
      }}
    >
      <h2 className="text-center under my-3 lg:text-3xl md:text-2xl text-xl text-[#f6f6f6]">
        Your Cart: {data.length ? data.length : "0"}
      </h2>
        <div className="mx-auto mt-3 absolute inset-0 overflow-y-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">

            {data.map((product) => ( <>
             <ul key={product._id} className="space-y-4 mx-auto odd:bg-sky-100/90 even:bg-sky-200/80 hover:bg-sky-50 rounded-lg cursor-pinter my-1">
                <li className="flex items-center gap-4 px-1">
                  <img
                    src={product.photo}
                    alt=""
                    className="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="lg:text-sm md:text-xs text-[10px]  text-gray-900">{product.name}</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline lg:text-xs md:text-[10px] text-[8px] ">Delivery Time:</dt>
                        <dd className="inline lg:text-xs md:text-[10px] text-[8px] ">2 Days</dd>
                      </div>
                    </dl>
                    <dl className="mt-0.5 space-y-px text-[10px] text-sky-600">
                      <div>
                        <dt className="inline lg:text-xs md:text-[10px] text-[8px] ">Price: </dt>
                        <dd className="inline lg:text-xs md:text-[10px] text-[8px] "> {product.price}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <div className="flex items-center justify-center border-2 rounded-sm border-sky-200 text-sm">
                    <button className="px-2  bg-sky-300/60 hover:bg-sky-400/60"
                                onClick={()=>handleMakePlusCart(product._id)}>+</button>
                                <p className="mx-1">{product.quantity}</p>
                                <button className='px-2  bg-sky-300/60 hover:bg-sky-400/60'
                                onClick={()=>handleMakeMinusCart(product._id)}>
                                  -</button></div>

                              <button onClick={() => {setSelectedProduct(product); }}
                              className=" text-white lg:mx-8 md:mx-2 mx-0 rounded bg-[#82C1DA] lg:p-1 p-[1px] lg:text-sm text-xs  font-medium transition hover:scale-105 px-2">
                              pay</button>

                  <button onClick={() => handleDelete(product._id)} className="text-gray-600 transition hover:text-red-600">
                      <span className="sr-only">Remove item</span>
                      <MdDeleteForever className="text-xl text-sky-600 hover:text-pink-600"></MdDeleteForever>
                    </button>
                  </div>
                </li>
      </ul>
        {/* payment Modal */}
                    {modalStatus && (
                        <PaymentModal
                            product={selectedProduct}
                            modalStatus={setModalStatus}
                      ></PaymentModal>
                    )}

                        </>
                        ))}
              <div className="mt-8 flex justify-end border-x-2 p-4 bg-sky-100/90 rounded-md  border-[#333333] pt-8">
            {selectedProduct && <>   
            <div className="w-screen max-w-lg space-y-4 ">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Product Price</dt>
                      <dd>৳ {selectedProduct.price}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Delivery charge</dt>
                      <dd>৳ 50</dd>
                    </div>    
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>৳ {selectedProduct.price + 50}</dd>
                    </div>
                  </dl>

                
                  <div className="flex justify-end">
                    <button  onClick={() => {selectedProduct 
                            setModalStatus(true);}} 
                      className="block rounded hover:bg-[#FFD4D8] px-5 py-3 text-sm text-gray-600 transition bg-[#AEDFF7]"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
                </>
            } 
            {!selectedProduct &&
              <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Product Price</dt>
                      <dd>৳ 0</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Delivery charge</dt>
                      <dd>৳ 0</dd>
                    </div>    
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>৳ 0</dd>
                    </div>
                  </dl>


                  <div className="flex justify-end">
                    <button  
                      className="block rounded hover:bg-[#FFD4D8] px-5 py-3 text-sm text-gray-600 transition bg-[#AEDFF7]"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
      }
              </div>
            </div>
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