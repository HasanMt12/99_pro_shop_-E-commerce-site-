import { useEffect, useState } from 'react';
import { GiPlainCircle } from 'react-icons/gi';
import './HomePage.css'
import offerPhoto from '@/assets/Offer-min.png'
const OfferSection = () => {
    const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // Set the date we're counting down to
    const countDownDate = new Date("november 25, 2023 15:37:25").getTime();

    // Update the count down every 1 second
    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in the state variable "countdown"
      setCountdown(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );

      // If the count down is over, clear the interval and set "EXPIRED"
      if (distance < 0) {
        clearInterval(x);
        setCountdown("EXPIRED");
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(x);
  }, []);
    return (
       
          <div className='relative z-5 lg:mt-[12rem] md:mt-[10rem] mt-[8rem] mb-10 lg:mx-[8rem] '> 
         <img  src={offerPhoto}
          className='absolute  lg:left-20 md:left-14  left-6  lg:w-96 md:w-64 w-52 lg:-mt-[11.6rem] md:-mt-[8rem] -mt-[6rem]'
           
          ></img>
         <div className='lg:-mt-32 md:-mt-24 -mt-20 absolute lg:left-64 md:left-40 left-32'>
            <h2 className="lg:text-3xl shadow-lg px-4 py-2 rounded-lg tracking-wider md:text-2xl text-sky-500 font-[Merriweather] sm:text-xl mt-6 lg:ml-[6.5rem] md:ml-[4.8rem] ml-[3.5rem] -mb-[22px] ">
                Super <span className="text-pink-400"> Offer </span></h2>

       </div>
       
        <div className="relative  rounded-md shadow-sm shadow-[#b4cbda] bg-[#f3f6f8]  z-1 lg:gap-4 md:gap-2 gap-1  ">
          <div className=' w-full px-6 py-6'>
            <div className='flex flex-wrap justify-center md:gap-x-6 gap-x-3 lg:gap-x-10'></div>
                <div className="flex justify-center items-center md:gap-6 gap-3 lg:gap-10">
                <h2 className="bg-sky-100/60 rounded-xl shadow-lg p-2 lg:text-xl md:text-lg text-sm text-sky-500 flex justify-start items-center gap-1 lg:gap-2"> <GiPlainCircle className="text-[#B0DDEF] text-xs lg:text-sm"/> Only this month <GiPlainCircle className="text-[#B0DDEF] text-sm"/></h2>
                <h2 className="">Up to <span className="lg:text-2xl text-xl text-pink-400">20%</span> Discount!</h2>
                </div>
                <h2 className='text-center my-2 lg:text-xl  tracking-wider md:text-lg text-[#333333] font-[Merriweather] text-md '>First Two Orders with Unbeatable Savings!</h2>
                  
                  <div className="flex flex-col my-8  px-4 py-2 rounded-lg gap-2 items-center justify-between">
                    <h3 className="lg:text-2xl md:text-xl txt-lg font-semibold text-pink-400">Don't Miss Out: <span className="text-[#333333]">Offer Ends In</span></h3>
                    <span id="countdown" className="bg-sky-100 shadow-lg p-2 rounded-lglg:text-3xl md:text-2xl text-xl font-semibold tracking-widest text-sky-700">
                        {countdown}
                    </span>
                    </div>
            </div>
           
        </div>
        </div>
    );
};

export default OfferSection;