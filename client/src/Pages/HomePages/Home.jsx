import Hero from "./Hero";
import { IoIosArrowForward } from "react-icons/io";
import Categories from "../categories/Categories";
// import MobilCategories from "./categories/MobilCategories";
import AllProducts from "../products/AllProducts/AllProducts";
import { Link } from "react-router-dom";
// import AdsSlider from "./AdsSlider";
import { useQuery } from "@tanstack/react-query";
import CategoriesCard from "../categories/CategoriesCard";
import { GiPlainCircle } from 'react-icons/gi';
import System from "./BusinessSystem";
import OfferSection from "./OfferSection";
const Home = () => {

 const {data: categories = []  } = useQuery({
        queryKey: ['categories'],
        queryFn: async() =>{
            const res = await fetch(`https://99-pro-shop-server.vercel.app/categories`);
            const data = await res.json();
            return data;    
        }
    });
   
  return (
    <>
      {/* Only large device visible */}
      <div className=" hidden lg:block">
  
        <div className="flex justify-between mx-[8rem] items-start mt-4 gap-10 h-[25rem]">
          <div className="w-[25%] bg-[#f3f6f8] h-[25rem]  rounded-md shadow-sm shadow-[#b4cbda] ">
              <ul className="flex  mb-0 list-none flex-wrap pt-3 pb-4 flex-col">
              
              <div className="bg-sky-100/60 shadow-lg flex justify-between mx-8 my-3 py-1 rounded-2xl items-center px-8"> 
                <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
                  <h2 className="font-medium tracking-wide  mx-6 text-md text-pink-500  font-[Montserrat]"> Categories</h2>
                <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
              </div>
              <Link to='/allProducts'> <li className= "cursor-pointer tracking-wide font-[Montserrat]  hover:text-sky-500 hover:bg-sky-100/60  px-6 py-1  text-[0.9rem]  text-pink-500  text-start flex justify-between start gap-4 items-center">
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
          <div className="w-[75%]">
            <Hero></Hero>
          </div>
        </div>
      <div>
            <AllProducts ></AllProducts> 
            <OfferSection></OfferSection> 
            <System></System>
           
          </div>
      </div>

      <div className="lg:hidden block">
          <Hero></Hero>
          <CategoriesCard></CategoriesCard>
          <AllProducts></AllProducts>
          <OfferSection></OfferSection> 
          <System></System>
      </div>
    </>
  );
};

export default Home;
