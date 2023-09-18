import { useEffect } from "react";
import Hero from "./Hero";
import "aos/dist/aos.css";
import { IoIosArrowForward } from "react-icons/io";
import Aos from "aos";
import Banner from "./Banner";
import Categories from "../categories/Categories";
// import MobilCategories from "./categories/MobilCategories";
import AllProducts from "../products/AllProducts/AllProducts";
import { Link } from "react-router-dom";
// import AdsSlider from "./AdsSlider";
import { useQuery } from "@tanstack/react-query";
import CategoriesCard from "../categories/CategoriesCard";
import useAdmin from "../../hooks/useAdmin";


const Home = () => {

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

 const {data: categories = []  } = useQuery({
        queryKey: ['categories'],
        queryFn: async() =>{
            const res = await fetch(`https://99-pro-shop-server.vercel.app/categories`);
            const data = await res.json();
            return data;    
        }
    });
    const [isAdmin] = useAdmin();
  return (
    <>
      {/* Only large device visible */}
      <div className=" hidden lg:block">
        {isAdmin && <Link to="dashboard"  className="flex justify-end mx-32"><button type="button" className="py-[.388rem] px-2 inline-flex justify-center items-center gap-2 rounded-md border-2 border-sky-200/60 font-semibold text-blue-500 hover:text-white hover:bg-sky-500 hover:border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm mt-1 ">
                      Dashboard
                      </button></Link>}
        <div className="flex justify-between mx-[8rem] items-start mt-4  h-[25rem]">
          <div className="w-[25%] bg-[#f3f6f8] h-[25rem]  rounded-md shadow-sm shadow-[#b4cbda] ">
              <ul className="flex  mb-0 list-none flex-wrap pt-3 pb-4 flex-col">
              <h2 className="font-bold mt-2 mx-[4.5rem] text-md text-sky-500"> Categories</h2>
              <Link to='/allProducts'> <li className= "cursor-pointer  hover:text-sky-400 hover:bg-sky-100 hover:opacity-80 pl-[4.5rem] pr-[3rem] py-2  text-[0.9rem]  text-[#EA0F62]  text-start flex justify-between start gap-4 items-center ">
                  <h2>All product  </h2>
                  <IoIosArrowForward className=""></IoIosArrowForward>
                </li> 
              </Link>       
              {
                categories.map(category=> <Categories
                      key={category._id}
                      category={category}
                ></Categories>)
              }
            </ul>
          </div>
          <div className="w-[70%]">
            <Hero></Hero>
          </div>
        </div>
      <div>
            <AllProducts ></AllProducts> 
            <Banner className="lg:mx-[8rem"></Banner></div>
      </div>

      <div className="lg:hidden block">
          <Hero></Hero>
          <CategoriesCard></CategoriesCard>
          <AllProducts></AllProducts> 
          <Banner ></Banner>
      </div>
    </>
  );
};

export default Home;
