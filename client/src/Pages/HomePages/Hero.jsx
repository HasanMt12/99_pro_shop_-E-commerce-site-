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
import logo3 from '../../assets/3.png'
import logo4 from '../../assets/4.png'
import './HomePage.css'
import { GrFormNext , GrFormPrevious } from 'react-icons/gr';
const Hero = () => {
    return (
        <div className="">
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
          
            <SwiperSlide  className=''> 
                    <img src='https://i.ibb.co/bgqQCjY/i.jpg' className="w-full object-cover lg:h-[25rem] md:h-[18rem] h-[14rem] " />
              </SwiperSlide>
              <SwiperSlide  className=''> 
                    <img src={logo3} className="w-full object-cover lg:h-[25rem] md:h-[18rem] h-[14rem] " />
              </SwiperSlide>
              <SwiperSlide  className=''> 
                    <img src={logo4} className=" w-full object-cover lg:h-[25rem] md:h-[18rem] h-[14rem]" />
              </SwiperSlide> 

              {/* custom swiper js button style */}
              <div  style={{width: "2rem", height: "26rem",   display: "grid", placeItems: "center", position: "absolute", zIndex: 10, top: "0", left: 0 }} className="bg-[#f8f3f4] opacity-20 button-prev">
                        <GrFormPrevious fontSize='large' style={{ cursor: "pointer" }} ></GrFormPrevious>
                    </div>
              <div  style={{width: "2rem", height: "26rem",   display: "grid", placeItems: "center", position: "absolute", zIndex: 10, top: "0", right: 0 }} className="bg-[#f8f3f4] opacity-20 button-next">
                        <GrFormNext fontSize='large' style={{ cursor: "pointer" }} ></GrFormNext>
                    </div>
          </Swiper>
           
        </div>
    );
};

export default Hero;