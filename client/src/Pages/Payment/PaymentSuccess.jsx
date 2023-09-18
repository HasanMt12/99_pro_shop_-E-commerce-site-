import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo99.png";

const PaymentSuccess = () => {
  const location = useLocation();

  // Extracting the 'transactionId' from the URL query params
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");

  const [order, setOrder] = useState({});

  useEffect(() => {
    // Fetching order details based on the 'transactionId'
    fetch(`https://99-pro-shop-server.vercel.app/orders/by-transaction-id/${transactionId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [transactionId]);

  if (!order?._id) {
    return (
      <div>
        No order found
      </div>
    );
  }

  return (
    <>
      <div className="bg-white relative rounded-lg shadow-lg px-8 py-6 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
            <div className="text-gray-700 font-semibold text-lg">99 Pro shop BD</div>
          </div>
          <div className="text-gray-700">
            <div className="font-bold text-xl mb-2">INVOICE</div>
            <div className="text-sm">Date: {order.paidAt}</div>
            <div className="text-sm">Phone: {order.phone}</div>
          </div>
        </div>
        <div className="border-b-2 border-sky-300 pb-1 mb-8">
          <h2 className="lg:text-2xl text-sky-800 text-lg font-bold mb-2">Bill To:</h2>
          <div className="text-gray-700 ">{order.customerName}</div>
          <div className="text-gray-700 ">{order.postcode}</div>
          <div className="text-gray-700 ">{order.location}</div>
          <div className="text-gray-700">{order.email}</div>
          <h2 className="text-center font-bold mt-7 text-sky-600/80">{order.productName}</h2>
        </div>

        <table className="w-full text-left mb-8">
          <thead>
            <tr>
              <th className="text-sky-800 font-bold uppercase py-1">Transaction ID</th>
              <th className="text-sky-800 font-bold uppercase py-1">Quantity</th>
              <th className="text-sky-800 font-bold uppercase py-1">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 text-sm text-gray-700">{transactionId}</td>
              <td className="py-4 text-gray-700">{order.productQuantity}</td>
              <td className="py-4 text-gray-700">{order.price}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mb-8">
          <div className="text-sky-700 mr-2">Total:</div>
          <div className="text-sky-800 font-bold text-xl">{order.price}</div>
        </div>
        <div className="border-t-2 border-gray-300 pt-8 mb-5">
          <button onClick={() => window.print()} className="px-3 py-2 bg-sky-600 hover:bg-sky-700 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-4 flex ml-auto print:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="ml-2">Download</span>
          </button>
        </div>
        
        {/* Watermark 1 */}
        <div className="watermark watermark1">99 Pro Shop BD</div>
        
        {/* Watermark 2 */}
        <div className="watermark watermark2">99 Pro Shop BD</div>
        
        {/* Watermark 3 */}
        <div className="watermark watermark3">99 Pro Shop BD</div>
        
        {/* Watermark 4 */}
        <div className="watermark watermark4">99 Pro Shop BD</div>
        
        {/* Watermark 5 */}
        <div className="watermark watermark5">99 Pro Shop BD</div>
      </div>
    </>
  );
};

export default PaymentSuccess;
