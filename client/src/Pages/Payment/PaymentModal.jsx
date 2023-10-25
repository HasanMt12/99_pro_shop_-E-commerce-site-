import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import toast from "react-hot-toast";

const PaymentModal = ({ product, modalStatus }) => {
  const [openTab, setOpenTab] = useState(1);
  const { user } = useContext(AuthContext);

  // Function to handle the booking form submission
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const postcode = form.postcode.value;
    const currency = form.currency.value;
    const order = {
      cart: product._id,
      email,
      phone,
      location,
      postcode,
      currency,
      productName: product.name,
      productQuantity: product.quantity,
      customerName: user.displayName,
    };

    console.log(order);

    fetch("https://99-pro-shop-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.replace(data.url);
        toast.success('Payment Successful');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div data={product} className="relative z-10">
      <div data-aosName="zoom-in" className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <div className="w-[50%] mx-auto bg-gray-50 p-4">
            <button
              className="p-2 flex justify-end bg-[#EA0F62] right-1 transition duration-200 rounded hover:bg-[#c7497a] focus:bg-[#EA0F62] focus:outline-none focus:shadow-outline"
              onClick={() => modalStatus(false)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                />
              </svg>
            </button>
            <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1 ? "text-white bg-pink-400/80" : "text-white bg-gray-300")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Cash on Delivery
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2 ? "text-white bg-pink-400/80" : "text-white bg-gray-300")
                  }
                  onClick={(e) => {
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
                    {/* Cash on Delivery Form */}
                    <section className="bg-gray-100">
                      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="rounded-lg">
                          <form className="space-y-4">
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
                                  name="phone"
                                  type="number"
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
                            <input
                              className="bg-pink-500/80 rounded p-2 text-white text-semibold w-full"
                              type="submit"
                              value="Submit"
                            />
                          </form>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    {/* Bkash Payment Form */}
                    <section className="bg-gray-100">
                      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="rounded-lg">
                          {product.name} {parseFloat(product.price) + 50}

                          <form onSubmit={handleBooking} className="space-y-4">
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
                                  name="phone"
                                  type="number"
                                  placeholder="number"
                                />
                              </div>
                              <div>
                                <input
                                  className="w-full rounded-lg border-pink-500 border-b-3 p-3 text-sm"
                                  name="postcode"
                                  type="text"
                                />
                              </div>
                              <select
                                defaultValue="BDT"
                                name="currency"
                                className="select select-bordered max-w-xs"
                              >
                                <option value="BDT">BDT</option>
                                <option value="USD">USD</option>
                              </select>

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
                            <input
                              value="submit"
                              type="submit"
                              className="bg-pink-500/80 rounded p-2 text-white text-semibold w-full"
                            />
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
  );
};

export default PaymentModal;
