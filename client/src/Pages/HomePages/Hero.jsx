import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/navigation';
import "swiper/css";
import "swiper/css/pagination";
import {  Autoplay ,  A11y, Pagination } from "swiper";
import 'swiper/css/scrollbar';
// Import Swiper React components
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';
import logo1 from '../../assets/1.png'
import logo3 from '../../assets/3.png'
import logo4 from '../../assets/4.png'
import './HomePage.css'

const Hero = () => {
    return (
        <div className="">
           <Swiper className='w-[100%] bg-pink-50 border-[1px] rounded-lg border-pink-100 shadow-lg shadow-pink-100 mx-auto'
          slidesPerView={1.5}
         
        spaceBetween={30}
          
            modules={[Pagination, Autoplay, A11y,]}
           loop={true}
            autoplay={{ delay: 5000,}}
            
          >
          
            <SwiperSlide  className=''> 
                    <img src={logo1} className="object-cover " />
              </SwiperSlide>
            <SwiperSlide  className=''> 
                    <img src='https://i.ibb.co/bgqQCjY/i.jpg' className=" " />
              </SwiperSlide>
              <SwiperSlide  className=''> 
                    <img src={logo3} className=" " />
              </SwiperSlide>
              <SwiperSlide  className=''> 
                    <img src={logo4} className=" " />
              </SwiperSlide>
           
              

                
          </Swiper>
        </div>
    );
};

export default Hero;