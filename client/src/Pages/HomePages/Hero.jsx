import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/navigation';
import "swiper/css";
import "swiper/css/pagination";
import {  Autoplay ,  A11y } from "swiper";
import { Navigation } from 'swiper';
import 'swiper/css/scrollbar';
// Import Swiper React components
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';
import './HomePage.css'
import { GrFormNext , GrFormPrevious } from 'react-icons/gr';
import { Link } from "react-router-dom";

import { GiPlainCircle } from 'react-icons/gi'

const Hero = () => {
   
    return (
        <div className="main-slider">
           <Swiper 
           style={{ position: "relative", }}
           className='w-full lg:lg:h-[25rem] md:h-[18rem] h-[14rem] lg:mt-0 mt-2 bg-pink-50 border-[1px] pb-1 rounded-lg border-pink-100 shadow-lg shadow-pink-100 mx-auto'
              slidesPerView={1}
              spaceBetween={30}
              modules={[Navigation, Autoplay, A11y,]}
                   navigation={{
                        nextEl: ".button-next",
                        prevEl: ".button-prev"
                    }}
              loop={true}
              autoplay={{ delay: 5000,}} >
          
          <SwiperSlide className="relative">
                <Link to="https://www.facebook.com/groups/1320450522017680" target="_blank">
                    <div className="absolute image-layer tracking-wide font-[Montserrat] flex flex-col gap-3 top-[65%] left-[20%] z-10 text-white">
                    <div className="bg-sky-100/60 flex justify-between rounded-2xl gap-2 items-center lg:px-2 md:px-2 px-2">
                        <h2 className="font-medium text-sm text-pink-500">buy anything at a cheap rate , follow</h2>
                        <GiPlainCircle className="text-[#B0DDEF] text-sm" />
                    </div>
                    <div className="bg-sky-100/60 flex justify-between rounded-2xl gap-2 items-center lg:px-2 md:px-2 px-2">
                        <h2 className="font-medium text-sm text-pink-500">Our Page <a href="https://www.facebook.com/groups/1320450522017680" target="blank" >99pro</a> and Enjoy the shopping</h2>
                        <GiPlainCircle className="text-[#B0DDEF] text-sm" />
                    </div>
                    </div>
                </Link>
                <img
                    src="https://i.ibb.co/yP3V9CD/i2-min.jpg"
                    className="w-full object-cover lg:h-[25rem] md:h-[18rem] h-[14rem] absolute top-0 right-0"
                />
                </SwiperSlide>
              <SwiperSlide className="relative">
                <Link to="/categories/BeautyProducts">
                    <div className="absolute image-layer tracking-wide font-[Montserrat] flex flex-col gap-3 top-[65%] left-[20%] z-10 text-white">
                    <button className="bg-sky-50 w-[4rem] text-sm border-sky-500 text-pink-500 border-b-2 rounded-b-md">
                        Explore
                    </button>
                    <div className="bg-sky-100/60 flex justify-between rounded-2xl gap-2 items-center lg:px-2 md:px-2 px-2">
                        <h2 className="font-medium text-md text-pink-500">Our beauty Product Collection</h2>
                        <GiPlainCircle className="text-[#B0DDEF] text-sm" />
                    </div>
                    </div>
                </Link>
                <img
                    src="https://i.ibb.co/D5qT2sP/beauty-min.jpg"
                    className="w-full object-cover lg:h-[25rem] md:h-[18rem] h-[14rem] absolute top-0 right-0"
                />
                </SwiperSlide>
              <SwiperSlide className="relative">
                <Link to="/categories/BabyProduct">
                    <div className="absolute image-layer tracking-wide font-[Montserrat] flex flex-col gap-3 top-[65%] left-[20%] z-10 text-white">
                    <button className="bg-sky-50 w-[4rem] text-sm border-sky-500 text-pink-500 border-b-2 rounded-b-md">
                        Explore
                    </button>
                    <div className="bg-sky-100/60 flex justify-between rounded-2xl gap-2 items-center lg:px-2 md:px-2 px-2">
                        <h2 className="font-medium text-md text-pink-500">Our Baby Product Collection</h2>
                        <GiPlainCircle className="text-[#B0DDEF] text-sm" />
                    </div>
                    </div>
                </Link>
                <img
                    src="https://i.ibb.co/gms4jmm/baby-care-min.jpg"
                    className="w-full object-cover lg:h-[25rem] md:h-[18rem] h-[14rem] absolute top-0 right-0"
                />
                </SwiperSlide>

              {/* custom swiper js button style */}
              <div  style={{width: "2rem", height: "26rem",   display: "grid", placeItems: "center", position: "absolute", zIndex: 10, top: "0", left: 0 }} className="bg-[#f8f3f4] opacity-20 button-prev">
                        <GrFormPrevious fontSize='large' style={{ cursor: "pointer"}} ></GrFormPrevious>
                    </div>
              <div  style={{width: "2rem", height: "26rem",   display: "grid", placeItems: "center", position: "absolute", zIndex: 10, top: "0", right: 0 }} className="bg-[#f8f3f4] opacity-20 button-next">
                        <GrFormNext fontSize='large' style={{ cursor: "pointer" }} ></GrFormNext>
                    </div>
          </Swiper>
           
        </div>
    );
};

export default Hero;