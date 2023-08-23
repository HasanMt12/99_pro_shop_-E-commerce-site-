import { useEffect, useState } from "react";
import Hero from "./Hero";
import "aos/dist/aos.css";
import { IoIosArrowForward } from "react-icons/io";
import Aos from "aos";
import Banner from "./Banner";
 import Categories from "./categories/Categories";
import MobilCategories from "./categories/MobilCategories";
import AllProducts from "./products/AllProducts/AllProducts";
import { Link } from "react-router-dom";


const Home = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

 const [categories , setCategories] = useState([]);
    useEffect(()=>{
        fetch("https://99-pro-server.vercel.app/categories")
        .then(res => res.json())
        .then(data => setCategories(data))

    },[]);

  return (
    <>
      <div className="flex justify-center items-start ">
        <div className="lg:w-[15%] hidden lg:block h-full">
          <ul className="flex  mb-0 list-none flex-wrap pt-3 pb-4 flex-col">
           <Link to='/allProducts'> <li
              className=
                "cursor-pointer  hover:text-blue-400/80  mx-6 my-3 font-semibold text-sm uppercase text-[#EA0F62]  text-start flex justify-start gap-4 items-center " 
              
            >
              <h2>All product  </h2>
              <IoIosArrowForward className=""></IoIosArrowForward>
            </li> 
          </Link>
            
            {
               categories.map(category=> <Categories
                    key={category._id}
                    category={category}
                    >    
                    </Categories>)
            }
            
          </ul>
        </div>
        <div className="lg:w-[85%] w-[98%] shadow-md">
          <div className=" lg:hidden block">
            <ul className="flex md:gap-2 ml-2 mb-0 list-none flex-wrap pt-2 flex-row">
              <li
                
                className= "cursor-pointer hover:text-blue-400/80  text-[#EA0F62] md:mx-4 sm:mx-2 text-xs   font-semibold  uppercase hover:text-[#EA0F62]  text-start flex justify-start  items-center "               >
                <h2>Home</h2>
                <IoIosArrowForward></IoIosArrowForward>
              </li>
              {
               categories.map(category=> <MobilCategories
                    key={category._id}
                    category={category}
                    >    
                    </MobilCategories>)

            }
             
            </ul>
          </div>
          <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 ">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div >
                  <>
                    <Hero></Hero>
                    <AllProducts></AllProducts> 
                    <Banner></Banner>
                  </>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
