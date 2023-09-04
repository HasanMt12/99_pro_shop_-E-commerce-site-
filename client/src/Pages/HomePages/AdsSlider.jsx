import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/navigation';
import "swiper/css";
import "swiper/css/pagination";
import {  Autoplay ,  A11y, Pagination, EffectCube } from "swiper";
import 'swiper/css/scrollbar';
// Import Swiper React components
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';
import logo1 from '../../assets/Beige  Simple Skincare Ads Instagram Post.png'
import logo2 from '../../assets/Beige  Simple Skincare Ads Instagram Post.png'
import logo3 from '../../assets/Black Modern Coming Soon Instagram Post.png'
import logo4 from '../../assets/Minimalist Skincare Sale ads Instagram Post.png'
const AdsSlider = () => {
    return (
        <>
         <Swiper className='w-[90%] p-2 mx-2 bg-pink-50 border-[1px]  rounded-lg border-pink-100 shadow-md shadow-pink-100 '
            effect={'cube'}
            grabCursor={true}
            cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,}}
            modules={[EffectCube, Pagination ,  Autoplay]} 
            autoplay={{ delay: 3000,}}
            loop={true}>
              
            <SwiperSlide  className=''> 
                    <img src={logo1} className="object-cover " />
              </SwiperSlide>
            <SwiperSlide  className=''> 
                    <img src={logo2} className=" " />
              </SwiperSlide>
              <SwiperSlide  className=''> 
                    <img src={logo3} className=" " />
              </SwiperSlide>
              <SwiperSlide  className=''> 
                    <img src={logo4} className=" " />
              </SwiperSlide> 
          </Swiper>
  
        </>
    );
};

export default AdsSlider;