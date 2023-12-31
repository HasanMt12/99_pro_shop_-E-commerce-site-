import { SiFacebook} from "react-icons/si";
import comingSoon from '/coming-Soon-min.jpg'
import { Link } from 'react-router-dom';


const Offer = () => {
    return (
          
         <div className="relative mb-10 bg-sky-50 py-4 flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0  right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0 ">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src={comingSoon}
          alt=""
        />
      </div>
      <div className="relative mb-4 flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          
          <h2 className = "mb-5 font-sans text-3xl font-bold tracking-tight text-sky-500 sm:text-4xl sm:leading-none" >
           <span className="text-pink-400">Coming Soon:</span>
           <br></br>  Irresistible Deals Await!
          </h2>
          <h2 className= "mb-5 font-sans text-lg font-semibold tracking-tight text-sky-700 sm:text-2xl sm:leading-none" >
            Do not Miss Out on Upcoming Discounts
          </h2>

           <button 
            className='flex justify-center items-center my-2 gap-2 px-16 text-pink-400 mb-2 tracking-wide font-[Montserrat] bg-sky-100 rounded border-pink-500 border-b-[1px] lg:p-2 p-[3px] lg:text-sm md:text-xs text-xs font-medium transition hover:scale-105 '>
           <Link to='/' >Back to home </Link>
          </button>


        </div>

         <ul className="flex justify-start  items-end gap-2 ">
        <a href="https://www.facebook.com/99ProShopBD" target="blank" className="flex bg-white lg:w-8 lg:h-8 w-6 h-6 hover:bg-[#d4a5b7] rounded-full p-2 justify-center items-center shadow-lg shadow-[#dbaabd]" >
            <SiFacebook className="flex justify-center  text-[#3b5998]"></SiFacebook>
            </a > 
      </ul>
      </div>
    </div>
    );
};

export default Offer;