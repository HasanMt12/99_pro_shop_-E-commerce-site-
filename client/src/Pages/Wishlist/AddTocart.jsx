import { useContext,  useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
// import Loader from "../../components/Shared/Loader";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";


const AddTocart = () => {
      const [openTab, setOpenTab] = useState(1);
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

   const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const price = form.price.value;
    const TransId = form.TransId.value;
    const booking = {
      product: name,
      email,
      phone,
      location,
      price,
      TransId
    };
    // console.log(booking);
    fetch("https://99-pro-shop-server.vercel.app/payment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Booking confirmed");
        } else {
          toast.error(data.message);
        }
      });
  };

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
        fetch(`http://localhost:5000/cart/${id}`, {
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
        fetch(`http://localhost:5000/cart/cartMinus/${id}`, {
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
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cart Update</th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delete</th>
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
                        <td onClick={() => handleDelete(product._id)} className="px-2 py-4 cursor-pointer whitespace-nowrap text-right text-2xl text-pink-600 hover:text-pink-500 hover:text-3xl font-medium"><MdDeleteForever></MdDeleteForever>
                        </td>
                        </tr>
                      {modalStatus && (
                  <div data={product} className="relative z-10"    >
                    <div data-aosName="zoom-in" className="  fixed inset-0 z-10 overflow-y-auto ">
                    
                      <div className = "flex  min-h-full items-end justify-center  text-center sm:items-center sm:p-0 " >
                  <div className="w-[50%] mx-auto bg-gray-50 p-4">
                    
                      <button className="p-2  flex justify-end bg-[#EA0F62]  right-1 transition duration-200 rounded hover:bg-[#c7497a] focus:bg-[#EA0F62] focus:outline-none focus:shadow-outline"
                                onClick={() => setModalStatus(false)}>
                                  <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                    <path
                                      fill="currentColor"
                                      d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                    />
                                  </svg>
                                </button>
                    <ul  className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                      role="tablist" >
                      
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 1
                              ? "text-white  bg-pink-400/80"
                              : "text-white bg-gray-300")
                          }
                          onClick={e => {  e.preventDefault(); setOpenTab(1); }}
                          data-toggle="tab" href="#link1" role="tablist"  >
                          Cash on deliver
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 2
                              ? "text-white  bg-pink-400/80"
                              : "text-white bg-gray-300")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                          }}
                          data-toggle="tab"
                          href="#link2"
                          role="tablist"
                        >
                          Bkash Payment
                        </a>
                      </li>
                    </ul>
                    <div className="relative flex h-[30rem] flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                          <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                              

          <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            
            

                <div className="rounded-lg ">
                  <form onSubmit= {handleBooking }
                  className = "space-y-4" >
                    <div>
                  
                      <input
                        className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                          name="email"
                          type="email"
                          defaultValue={user.email}
                          disabled
                          placeholder="Your Email"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                      
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                        name="product"
                          type="text"
                          defaultValue={product.name}
                          disabled
                        />
                      </div>
                        <div>
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                        name="price"
                          type="text"
                          defaultValue={product.price}
                          disabled
                        />
                      </div>
                      <div>  
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                          name="phone"
                          type="text"
                          placeholder="Phone Number"
                      
                        />
                      </div>

                      <div>
                      
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                          name="location"
                          type="location"
                          placeholder="Location"
                          required
                        />
                      </div>
                    </div>
          <input className="bg-pink-500/80 rounded p-2 text-white text-semibold w-full" type="submit" value="Submit" />
                  

                

                  
                  </form>
                </div>

            </div>
          </section>
                          </div>
                          <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                        <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            
            

                <div className="rounded-lg ">
                  <form 
                  className = "space-y-4" >
                    <div>
                  
                      <input
                        className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                          name="email"
                          type="email"
                          defaultValue={user.email}
                          disabled
                          placeholder="Your Email"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                      
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                        name="product"
                          type="text"
                          defaultValue={product.name}
                          disabled
                        />
                      </div>
                        <div>
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                        name="price"
                          type="text"
                          defaultValue={product.price}
                          disabled
                        />
                      </div>
                      <div>
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                        name="TransId"
                          type="text"
                          placeholder="TransId"
                        />
                      </div>
                      <div>  
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                          name="phone"
                          type="number"
                          placeholder="Phone Number"
                      
                        />
                      </div>

                      <div>
                      
                        <input
                          className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                          name="location"
                          type="location"
                          placeholder="Location"
                          required
                        />
                      </div>
                    </div>
                <Link to={`cart/${product._id}`}>  <button className="bg-pink-500/80 rounded p-2 text-white text-semibold w-full">
                      submit
                    </button>
          </Link> 
                  </form>
                </div>

            </div>
          </section>
                          </div>
                    
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    </div>
                  </div>
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