
import { GiPlainCircle  } from 'react-icons/gi';
const MyOrder = () => {
    return (
        <div className="">
            <h1 className="text-3xl text-center mt-2 ">We are <b className='text-sky-500'>Almost</b> there!</h1>
            <h1 className="text-xl text-center ">User  <b className='text-sky-500'>Order History</b> Under Maintenance!</h1>
             <p className='text-center my-2'>Stay tuned for something amazing!!! 😊</p>
            <div className="bg-sky-100/60 shadow-lg flex justify-between gap-1 my-2 lg:py-2 md:py-2 py-1 rounded-2xl items-center lg:px-8 md:px-2 px-1 lg:w-[16rem] md:w-[15rem] w-[11rem]"> 
                <GiPlainCircle className="text-[#B0DDEF] lg:text-sm md:text-xs text-xs"/>
                  <h2 className="font-medium  tracking-wide font-[Montserrat]  lg:text-md md:text-sm text-xs text-pink-400">My Orders</h2>
                <GiPlainCircle className="text-[#B0DDEF] lg:text-sm md:text-xs text-xs"/>
              </div>
            <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
         
            <div className="overflow-hidden">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Bill</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Beauty Product</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">200 BDT</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">On Going...</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Baby Product</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Thornton</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Delivered</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Pet Items</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Wild</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Delivered</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
            
        </div>
    );
};

export default MyOrder;